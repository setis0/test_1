import {Module} from '@nestjs/common';
import {CronService} from './cron.service';
import {AppModule} from "../app/app.module";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        AppModule
    ],
    providers: [
        CronService
    ]
})
export class CronModule {
}
