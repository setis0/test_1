import {Global, Module} from '@nestjs/common';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ValuteHeadEntity} from "../entity/valute_head";
import {ValuteBodyEntity} from "../entity/valute_body";
import {options} from "../data-source";
import {AppController} from "./app.controller";

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(options),
        TypeOrmModule.forFeature([
            ValuteHeadEntity,
            ValuteBodyEntity
        ]),
    ],
    providers: [
        AppService
    ],
    controllers: [
        AppController
    ],
    exports: [
        AppService

    ]
})
export class AppModule {
}
