import { NestFactory } from '@nestjs/core';
import {AppModule, AppService} from "./app";
import {CronModule} from "./cron";
import {INestApplicationContext} from "@nestjs/common";

// async function cli() {
//   let app:INestApplicationContext;
//   console.log(process.argv,process.argv0)
//   const command = process.argv[2];
//   switch (command) {
//     case 'cron':
//       app = await NestFactory.createApplicationContext(
//           CronModule
//       );
//       break;
//     case 'fetch':
//       app = await NestFactory.createApplicationContext(
//           AppModule
//       );
//       const service = app.get(AppService);
//       await service.fetch()
//       await app.close();
//       process.exit(0);
//       break;
//
//     default:
//       console.log('Command not found');
//       process.exit(1);
//   }
//
// }
// cli();
async function bootstrap(){
  const application = await NestFactory.createApplicationContext(
      CronModule
  );
}
bootstrap()