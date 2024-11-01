import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {ValuteBodyEntity} from "./valute_body";

@Entity('valute_head')
export class ValuteHeadEntity {
    @PrimaryColumn({
        unique: true,

    })
    NumCode: number

    @Column({
        unique: true
    })
    CharCode: string

    @Column()
    Name: string

    @Column()
    Nominal: number

    @OneToMany(() => ValuteBodyEntity, body => body.head)
    bodys:ValuteBodyEntity[]

}