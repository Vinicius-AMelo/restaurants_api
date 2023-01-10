import Sequelize from 'sequelize'
import sequelizeConnection from '../database/database'
import RestaurantModel from './RestaurantModel'
import UserModel from './UserModel'
import DishModel from './DishModel'

const OrderModel = sequelizeConnection.define('order', {
    dishList: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    score: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
})

RestaurantModel.belongsTo(UserModel)
DishModel.belongsTo(RestaurantModel)
OrderModel.belongsTo(RestaurantModel)

export default OrderModel
