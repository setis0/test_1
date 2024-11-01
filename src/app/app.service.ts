import {Injectable, Logger} from '@nestjs/common';
import fetch from "node-fetch";
import {XMLParser} from "fast-xml-parser";
import {ValuteChunk, ValuteData, ValuteXml} from "./types";
import {InjectRepository} from "@nestjs/typeorm";
import {ValuteHeadEntity} from "../entity/valute_head";
import {In, Repository} from "typeorm";
import {ValuteBodyEntity} from "../entity/valute_body";
import {createHash} from "crypto";
import {decode} from 'iconv-lite'

@Injectable()
export class AppService {
    logger = new Logger('app')
    /**
     * какой метод будет использоваться recordBodyDiff - true recordBody -false
     */
    diff: boolean = true;
    protected hash: string = ''

    constructor(
        @InjectRepository(ValuteHeadEntity) private head: Repository<ValuteHeadEntity>,
        @InjectRepository(ValuteBodyEntity) private body: Repository<ValuteBodyEntity>
    ) {
    }

    getRepository(){
        return this
            .head
            .createQueryBuilder('head')
            .leftJoinAndSelect("head.bodys", "body")
            .select([
                'NumCode',
                'CharCode',
                'Name',
                'Nominal',
                'Value',
                'VunitRate',
                'createdAt',
            ])
    }

    /**
     * получение данных
     */

    async fetch() {
        const response = await fetch("http://www.cbr.ru/scripts/XML_daily.asp", {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "ru,en;q=0.9",
                "cache-control": "max-age=0",
                "upgrade-insecure-requests": "1",
            },
            "body": null,
            "method": "GET"
        });
        if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
        const result = await response.buffer()
        return decode(Buffer.from(result), 'win1251').toString()


    }

    async handler() {
        const xml = await this.fetch();
        if (this.check(xml)) {
            return
        }
        const data = this.parse(xml);
        await this.record(data)
    }

    /**
     * последний ответ с текущим через хэш sha512
     * @param xml
     */
    check(xml: string): boolean {
        const hash = createHash('sha512')
            .update(xml)
            .digest('hex')

        if (this.hash == hash) {
            return true
        }
        this.hash = hash;
        return false
    }

    /**
     * разбираем xml в данные
     * @param data
     */
    parse(data: string): ValuteData[] {
        const parser = new XMLParser();
        let jObj = parser.parse(data) as ValuteXml;
        return jObj["ValCurs"]["Valute"].map(function (value: ValuteChunk): ValuteData {
            return {
                ...value,
                VunitRate: parseFloat(value.VunitRate.replace(',','.')),
                Value: parseFloat(value.Value.replace(',','.'))
            }
        })
    }

    /**
     * записываем статические данные "NumCode", "CharCode", "Name"
     * @param data
     */
    async recordHead(data: ValuteData[]) {
        let ids = data.map(value => value.NumCode)
        const result = await this.head.find({
            select: ["NumCode"],
            where: {
                NumCode: In(ids)
            }
        });
        if (result != null && result.length > 0) {
            const rids = result.map(value => value.NumCode)
            ids = ids.filter(id => !rids.includes(id))
        }
        if (ids.length > 0) {
            let insertData = data
                .map<ValuteHeadEntity>(value => {
                    const entity = new ValuteHeadEntity()
                    for (const id of ["NumCode", "CharCode", "Name","Nominal"]) {
                        entity[id] = value[id]
                    }
                    return entity
                })
            await this.head.insert(insertData)
        }
    }

    /**
     * записываем без сравнение VunitRate,Value данные
     * @param data
     */
    async recordBody(data: ValuteData[]) {
        const items = data.map(value => {
            const entity = new ValuteBodyEntity()
            entity.headId = value.NumCode
            entity.Value = value.Value
            entity.VunitRate = value.VunitRate
            return entity
        });
        await this.body.insert(items)
    }

    /**
     * записываем только изменение VunitRate,Value
     * @param data
     */
    async recordBodyDiff(data: ValuteData[]) {
        let items = await Promise
            .all(data.map(async value => {
                const result = await this.body.findOne({
                    where: {
                        headId: value.NumCode,
                    },
                    order: {
                        id: "DESC",
                        createdAt: "DESC"
                    }
                });
                const f = !(
                    result != null
                    && (
                        parseFloat(result.VunitRate.toString()) == value.VunitRate
                        && parseFloat(result.Value.toString()) == value.Value
                    )
                )

                return (f) ? value : null
            }))
        await this.recordBody(items.filter(value => value != null))
    }

    /**
     * запись в базу данных
     * @param data
     */
    async record(data: ValuteData[]) {
        await Promise.all([
            this.recordHead(data),
            (this.diff)
                ? this.recordBodyDiff(data)
                : this.recordBody(data)

        ])
    }
}
