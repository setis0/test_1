import {Global, Module} from '@nestjs/common';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ValuteHeadEntity} from "./entity/valute_head";
import {ValuteBodyEntity} from "./entity/valute_body";
import {join} from 'path'
@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mariadb',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'qOJYo*@V',
            database: 'test',
            entities: [
                __dirname+'/entity/*.{ts,js}'
            ],
             // logging:[
             //     "error",
             //     "query"
             // ],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([ValuteHeadEntity,ValuteBodyEntity]),

    ],
    providers: [
        AppService
    ],
    exports:[
        AppService

    ]
})
export class AppModule {
}
