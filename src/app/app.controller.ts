import {Controller, Get, HttpStatus, Res} from "@nestjs/common";
import {AppService} from "./app.service";
import {Response} from 'express'
import {InjectRepository} from "@nestjs/typeorm";
import {ValuteHeadEntity} from "../entity/valute_head";
import {Repository} from "typeorm";
import {ValuteBodyEntity} from "../entity/valute_body";

@Controller()
export class AppController{

    constructor(
        protected service :AppService,

    ) {
    }
    @Get('/')
    async findAll(@Res() res: Response){
        const repository = this.service.getRepository();
        let result = await repository.getRawMany()
        res
            .status(HttpStatus.OK)
            .json((result == null)?[]:result.map(value => {
                 value.Value = parseFloat(value.Value);
                 value.VunitRate = parseFloat(value.VunitRate);
                 return value
            }))
    }


}