import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import {AppService} from "../app";

@Injectable()
export class CronService implements OnModuleInit {
    logger = new Logger('cron', {
        timestamp: true
    })

    constructor(
        readonly app: AppService
    ) {
    }

    async onModuleInit() {
        this.logger.log('начало запроса')
        await this.app.handler()
        this.logger.log('конец запроса')
    }

    /**
     * @todo указывается время запуска каждые 5 минут
     */
    @Cron('0 */5 * * * *')
    async handler() {
        this.logger.log('начало запроса')
        await this.app.handler()
        this.logger.log('конец запроса')
    }

}
