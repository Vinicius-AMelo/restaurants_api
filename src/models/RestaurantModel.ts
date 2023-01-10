import Sequelize from 'sequelize'
import sequelizeConnection from '../database/database'

const RestaurantModel = sequelizeConnection.define(
    'restaurant',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    { timestamps: false }
)

export default RestaurantModel
