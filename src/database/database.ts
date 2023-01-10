import * as dotenv from 'dotenv'

import { Sequelize } from 'sequelize'

dotenv.config()

const {
    DB_SCHEMA,
    DB_PASSWORD,
    MYSQLHOST,
    MYSQLUSER,
    MYSQLPASSWORD,
    MYSQLDATABASE,
    MYSQLPORT,
} = process.env

const sequelizeConnection = new Sequelize(
    `${MYSQLDATABASE}` || `${DB_SCHEMA}`,
    `${MYSQLUSER}` || 'root',
    MYSQLPASSWORD || DB_PASSWORD,
    {
        host: MYSQLHOST || 'localhost',
        dialect: 'mysql',
        port: Number(MYSQLPORT) || 3306,
    }
)

export default sequelizeConnection
