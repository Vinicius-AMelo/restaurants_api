/* eslint-disable object-curly-newline */
import { Request, Response } from 'express'
import UserModel from '../models/UserModel'

export function userGetAll(req: Request, res: Response) {
    UserModel.findAll({ raw: true }).then((userList) => {
        if (userList[0] !== undefined) res.status(200).json(userList)
        else if (userList[0] === undefined)
            res.status(404).json({ message: 'Users not found' })
    })
}

export function userGetOne(req: Request, res: Response) {
    const { id } = req.params
    UserModel.findOne({ where: { id }, raw: true }).then((user) => {
        if (user !== null) res.status(200).json(user)
        else if (user === null)
            res.status(404).json({ message: 'User not found' })
    })
}

export function userPost(req: Request, res: Response) {
    const { name, email, password, role } = req.body

    if (name === undefined || name === '')
        res.status(400).json({ message: "Name can't be null" })
    else if (email === undefined || email === '')
        res.status(400).json({ message: "Email can't be null" })
    else if (password === undefined || password === '')
        res.status(400).json({ message: "Password can't be null" })
    else if (role === undefined || role === '')
        res.status(400).json({ message: "Role can't be null" })
    else {
        UserModel.create({ name, email, password, role })
        res.status(200).json({ message: 'User successfully created' })
    }
}

export function userPostLogin(req: Request, res: Response) {
    const { email, password } = req.body

    if (email === undefined && password === undefined)
        res.status(400).json({ message: 'Invalid data' })
    else
        UserModel.findOne({ where: { email } }).then((user) => {
            if (user !== null) {
                const data = user.get()
                if (data.password === String(password)) res.json(data.role)
                else res.status(401).json({ message: 'Incorrect data' })
            } else if (user === null)
                res.status(404).json({ message: 'User not found' })
        })
}

export function userPut(req: Request, res: Response) {
    const { name, email, password, id } = req.body

    if (name === undefined && email === undefined && password === undefined) {
        res.status(400).json({ message: 'Nothing to change' })
    } else if (id === undefined)
        res.status(400).json({ message: "ID can't be null" })
    else {
        UserModel.update({ name, email, password }, { where: { id } }).then(
            (removedQntd) => {
                if (removedQntd[0] === 0)
                    res.status(400).json({
                        message: 'Invalid ID or nothing to change',
                    })
                else if (removedQntd[0] > 0)
                    res.status(200).json({
                        message: 'User successfully updated',
                    })
            }
        )
    }
}

export function userDelete(req: Request, res: Response) {
    const { id } = req.body

    if (id === undefined) res.status(400).json({ message: "ID can't be null" })
    else if (id !== undefined) {
        UserModel.destroy({ where: { id } }).then((removedQntd) => {
            if (removedQntd === 0)
                res.status(404).json({ message: 'ID not exists' })
            else if (removedQntd > 0)
                res.status(200).json({ message: 'User successfully deleted' })
        })
    }
}
