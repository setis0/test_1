import {NestFactory} from '@nestjs/core';
import {AppModule, AppService} from "./app";
import {CronModule} from "./cron";
import {Logger} from "@nestjs/common";
import * as process from "process";

async function cli() {
    const command = process.argv[2];
    const logger = new Logger('cli')
    switch (command) {
        case 'cron': {
            logger.log('cron')
            const app = await NestFactory.createApplicationContext(
                CronModule
            );
        }
            break;
        case 'http': {
            logger.log('http')
            const app = await NestFactory.create(
                AppModule
            );
            await app.listen(3000);
        }

            break;
        case 'all':
        {
            const app1 = await NestFactory.createApplicationContext(
                CronModule
            );
            const app2 = await NestFactory.create(
                AppModule
            );
            await app2.listen(3000);
        }
            break;

        default:
            console.log('Command not found',process.argv);
            process.exit(1);
    }

}

cli()