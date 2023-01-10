import express from 'express'

import {
    dishDelete,
    dishGetAll,
    dishGetOne,
    dishPost,
    dishPut,
} from './controllers/dishController'
import {
    orderGetAll,
    orderGetOne,
    orderPost,
} from './controllers/orderController'
import {
    restaurantDelete,
    restaurantGetAll,
    restaurantGetOne,
    restaurantPost,
    restaurantPut,
} from './controllers/restaurantController'
import {
    userPost,
    userPut,
    userDelete,
    userGetOne,
    userGetAll,
    userPostLogin,
} from './controllers/userController'

export const routes = express.Router()

routes.get('/user/:id', userGetOne)
routes.get('/users', userGetAll)
routes.post('/users/login', userPostLogin)
routes.post('/users', userPost)
routes.put('/users', userPut)
routes.delete('/users', userDelete)

routes.get('/restaurant/:id', restaurantGetOne)
routes.get('/restaurants', restaurantGetAll)
routes.post('/restaurants', restaurantPost)
routes.put('/restaurants', restaurantPut)
routes.delete('/restaurants', restaurantDelete)

routes.get('/dish/:id', dishGetOne)
routes.get('/dishes', dishGetAll)
routes.post('/dishes', dishPost)
routes.put('/dishes', dishPut)
routes.delete('/dishes', dishDelete)

routes.get('/order/:id', orderGetOne)
routes.get('/orders', orderGetAll)
routes.post('/orders', orderPost)
