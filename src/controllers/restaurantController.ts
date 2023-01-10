import { Request, Response } from 'express'
import RestaurantModel from '../models/RestaurantModel'
import UserModel from '../models/UserModel'

export function restaurantGetAll(req: Request, res: Response) {
    RestaurantModel.findAll({
        raw: true,
        include: [{ model: UserModel }],
    }).then((restaurantList) => {
        if (restaurantList[0] === undefined)
            res.status(404).json({ message: 'Restaurants not found' })
        else if (restaurantList[0] !== undefined)
            res.status(200).json(restaurantList)
    })
}

export function restaurantGetOne(req: Request, res: Response) {
    const { id } = req.params
    RestaurantModel.findOne({
        where: { id },
        raw: true,
        include: [{ model: UserModel }],
    }).then((restaurant) => {
        if (restaurant === null)
            res.status(404).json({ message: 'Restaurant not found' })
        else if (restaurant !== null) res.status(200).json(restaurant)
    })
}

export function restaurantPost(req: Request, res: Response) {
    const { name, category, userId } = req.body

    if (name === undefined)
        res.status(400).json({ message: "Name can't be null" })
    else if (category === undefined)
        res.status(400).json({ message: "Category can't be null" })
    else if (userId === undefined)
        res.status(400).json({ message: "UserId can't be null" })
    else {
        res.status(200).json({ message: 'Restaurant successfully created' })
        RestaurantModel.create({ name, category, userId })
    }
}

export function restaurantPut(req: Request, res: Response) {
    const { name, category, id } = req.body

    if (name === undefined && category === undefined)
        res.status(400).json({ message: 'Nothing to change' })
    else if (id === undefined)
        res.status(400).json({ message: "ID can't be null" })
    else {
        RestaurantModel.update({ name, category }, { where: { id } }).then(
            (removedQntd) => {
                if (removedQntd[0] === 0)
                    res.status(400).json({
                        message: 'Invalid ID or nothing to change',
                    })
                else if (removedQntd[0] > 0)
                    res.status(200).json({
                        message: 'Restaurant successfully updated',
                    })
            }
        )
    }
}

export function restaurantDelete(req: Request, res: Response) {
    const { id } = req.body

    if (id === undefined) res.status(400).json({ message: "ID can't be null" })
    else if (id !== undefined) {
        RestaurantModel.destroy({ where: { id } }).then((a) => {
            if (a === 0) res.status(404).json({ message: 'ID not exists' })
            else
                res.status(200).json({
                    message: 'Restaurant successfully deleted',
                })
        })
    }
}
