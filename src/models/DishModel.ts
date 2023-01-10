import Sequelize from 'sequelize'
import sequelizeConnection from '../database/database'

const DishModel = sequelizeConnection.define(
    'dish',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
    },
    { timestamps: false }
)

export default DishModel
