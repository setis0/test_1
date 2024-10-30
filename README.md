<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
## Task
[вакансия](https://ufa.hh.ru/vacancy/108752137)
Тестовое задание для backend разработчика

Необходимо реализовать сервис, выдающий текущий курс выбранной пользователем валюты из доступного списка, и историю ежедневного изменения курса выбранной валюты, начиная со дня запуска сервиса, через HTTP REST API, с доступом только для авторизованных пользователей. Должна быть консольная команда для обновления данных в таблице currency. Данные по курсам валют можно взять отсюда: http://www.cbr.ru/scripts/XML_daily.asp .
Фреймворк node.js 18+ (желательно Express JS), можно использовать БД MySQL 8+. Приветствуется использование кеширования, swagger документации, Docker.

Доп. требования:
1. История курсов валют должна быть на каждый день, без пропусков.
2. Сервис должен выдерживать 1500 запросов в секунду.
3. Для сборки проекта достаточно выполнить npm i && npm run dev, при желании можно завернуть все докеры, в общем сборка должна работать из коробки. Если будет что-то не тривиальное описать в README.md в корне проекта в github.

Ожидаемое решение этой задачи — это условно несколько файлов помимо фреймворка:

- скрипт для доступа к базе данных к указанной сущности (так называемая модель данных)
- скрипт для создания модели данных этой сущности в базе данных (так называемая миграция)
- скрипт, который запускается из консоли вручную или (так называемый консольный контроллер), обращается к чужому серверу по HTTP, разбирает ответ формата XML, сохраняет в базу данных
- скрипт, который будет выдавать сведения из базы данных при запросах по HTTP протоколу (так называемый веб-контролер)
- скрипт, который будет проверять доступ к данным при запросах по HTTP протоколу
- скрипт для тестирования консольного контролера и веб-контроллера
## links
- https://dev.to/edgargonzalez525/how-to-schedule-a-cron-job-with-nestjs-in-less-than-5-mins-cmi
## Manual
- скрипт для доступа к базе данных к указанной сущности (так называемая модель данных)
> [typeorm](https://typeorm.io/) используется для подключение к базе данных
```typescript
TypeOrmModule.forRoot({
    // доступ к базе данным
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'qOJYo*@V',
    database: 'test',
    //модели (сущности) 
    entities: [
        __dirname+'/entity/*.{ts,js}'
    ],
    //создается если нету таблиц (сущностей)
    synchronize: true,
})
```
- скрипт для создания модели данных этой сущности в базе данных (так называемая миграция)
> [typeorm](https://typeorm.io/) используется
```typescript

```
package.json
```json
"scripts": {
    
    "typeorm": "ts-node ./node_modules/typeorm/cli",
    "migration:run": "npm run typeorm migration:run -- -d ./src/config/typeorm.ts",
    "migration:generate": "npm run typeorm -- -d ./src/config/typeorm.ts migration:generate ./src/migrations/$npm_config_name",
    "migration:create": "npm run typeorm -- migration:create ./src/migrations/$npm_config_name",
    "migration:revert": "npm run typeorm -- -d ./src/config/typeorm.ts migration:revert"
  }
```
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
