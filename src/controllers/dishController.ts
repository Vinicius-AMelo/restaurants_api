import { Request, Response } from 'express'
import DishModel from '../models/DishModel'
import RestaurantModel from '../models/RestaurantModel'

export function dishGetAll(req: Request, res: Response) {
    DishModel.findAll({
        raw: true,
        include: [{ model: RestaurantModel }],
    }).then((dishList) => {
        if (dishList[0] === undefined)
            res.status(200).json({ message: 'Dishes not found' })
        else if (dishList[0] !== undefined) res.status(200).json(dishList)
    })
}

export function dishGetOne(req: Request, res: Response) {
    const { id } = req.params

    DishModel.findOne({
        where: { id },
        raw: true,
        include: [{ model: RestaurantModel }],
    }).then((dish) => {
        if (dish === null) res.status(200).json({ message: 'Dish not found' })
        else if (dish !== null) res.status(200).json(dish)
    })
}

export function dishPost(req: Request, res: Response) {
    const { name, description, price, restaurantId } = req.body

    if (name === undefined)
        res.status(200).json({ message: "Name can't be null" })
    else if (description === undefined)
        res.status(200).json({ message: "Description can't be null" })
    else if (price === undefined)
        res.status(200).json({ message: "Price can't be null" })
    else if (restaurantId === undefined)
        res.status(200).json({ message: "RestaurantId can't be null" })
    else {
        res.status(200).json({ message: 'Order successfully created' })
        DishModel.create({ name, description, price, restaurantId })
    }
}

export function dishPut(req: Request, res: Response) {
    const { name, description, price, id } = req.body
    if (name === undefined && description === undefined && price === undefined)
        res.status(200).json({ message: 'Nothing to change' })
    else if (id === undefined)
        res.status(200).json({ message: "ID can't be null" })
    else {
        DishModel.update({ name, description, price }, { where: { id } }).then(
            (removedQntd) => {
                if (removedQntd[0] === 0)
                    res.status(200).json({
                        message: 'Invalid ID or nothing to change',
                    })
                else if (removedQntd[0] > 0)
                    res.status(200).json({
                        message: 'Dish successfully updated',
                    })
            }
        )
    }
}

export function dishDelete(req: Request, res: Response) {
    const { id } = req.body

    if (id === undefined) res.status(200).json("ID can't be null")
    else if (id !== undefined) {
        DishModel.destroy({ where: { id } }).then((a) => {
            if (a === 0) res.status(200).json('ID not exists')
            else res.status(200).json({ message: 'Dish successfully deleted' })
        })
    }
}
