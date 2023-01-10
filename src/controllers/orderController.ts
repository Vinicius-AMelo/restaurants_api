import { Request, Response } from 'express'
import OrderModel from '../models/OrderModel'
import RestaurantModel from '../models/RestaurantModel'

export function orderGetAll(req: Request, res: Response) {
    OrderModel.findAll({
        raw: true,
        include: [{ model: RestaurantModel }],
    }).then((orderList) => {
        if (orderList[0] === undefined)
            res.status(404).json({ message: 'Orders not found' })
        else if (orderList[0] !== undefined) res.status(200).json(orderList)
    })
}

export function orderGetOne(req: Request, res: Response) {
    const { id } = req.params

    OrderModel.findOne({
        raw: true,
        include: [{ model: RestaurantModel }],
        where: { id },
    }).then((order) => {
        if (order === null) res.status(404).json({ message: 'Order not found' })
        else if (order !== null) res.status(200).json(order)
    })
}

export function orderPost(req: Request, res: Response) {
    const { dishList, score, restaurantId } = req.body

    if (dishList === undefined)
        res.status(400).json({ message: "List of Dishes can't be null" })
    else if (score === undefined)
        res.status(400).json({ message: "Score can't be null" })
    else if (score < 0 || score > 5)
        res.status(400).json({ message: 'Score must be between 0 and 5' })
    else if (restaurantId === undefined)
        res.status(400).json({ message: "RestaurantId can't be null" })
    else {
        res.status(200).json({ message: 'Order successfully created' })
        OrderModel.create({ dishList, score, restaurantId })
    }
}
