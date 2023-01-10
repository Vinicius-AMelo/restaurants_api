import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import sequelizeConnection from './src/database/database'
import { routes } from './src/routes'
import RestaurantModel from './src/models/RestaurantModel'
import UserModel from './src/models/UserModel'
import DishModel from './src/models/DishModel'
import OrderModel from './src/models/OrderModel'

dotenv.config()

const app = express()
const portaHTTP = 3333

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

sequelizeConnection
    .authenticate()
    .then(() => {
        app.emit('DB Connected')
    })
    .catch((e) => console.log(e))

UserModel.sync({ force: false }).then(() => {
    console.log('User table created successfully')

    RestaurantModel.sync({ force: false }).then(() => {
        console.log('Restaurant table created successfully')

        DishModel.sync({ force: false }).then(() => {
            console.log('Dish table created successfully')

            OrderModel.sync({ force: false }).then(() => {
                console.log('Order table created successfully')
            })
        })
    })
})

app.on('DB Connected', () => {
    app.listen(portaHTTP, () => {
        console.log(`Servidor HTTP iniciado em http://localhost:${portaHTTP}`)
    })
})
