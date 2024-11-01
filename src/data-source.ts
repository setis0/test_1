import "reflect-metadata"
import {DataSource} from "typeorm"
import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions";

export const options: DataSourceOptions = {
    name: "default",
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'qOJYo*@V',
    database: 'test',
    entities: [
        __dirname + '/entity/*.{ts,js}'
    ],
    synchronize: true,
    logging: false,
    migrations: [
        __dirname + '/migration/*.{ts,js}'
    ],
    migrationsTableName: "migrations",
    subscribers: [],
}
export const AppDataSource = new DataSource(options)
export default [
    AppDataSource
]