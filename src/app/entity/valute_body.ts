import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ValuteHeadEntity} from "./valute_head";

@Entity('valute_body')
export class ValuteBodyEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    headId: number

    @ManyToOne(() => ValuteHeadEntity, head => head.bodys)
    @JoinColumn()
    head: ValuteHeadEntity

    @Column({
        type:'decimal',
        precision: 11,
        scale: 6,
        unsigned: true
    })
    Value: number

    @Column({
        type:'decimal',
        precision: 11,
        scale: 6,
        unsigned: true
    })
    VunitRate: number

    @CreateDateColumn()
    createdAt: Date;


}