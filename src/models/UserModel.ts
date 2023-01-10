import Sequelize from 'sequelize'
import sequelizeConnection from '../database/database'

const UserModel = sequelizeConnection.define(
    'user',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    { timestamps: false }
)

export default UserModel
