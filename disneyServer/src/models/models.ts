import {STRING} from "sequelize";

const sequelize = require('../db')
const {DataTypes} = require('sequelize')

export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})


module.exports = {
    User,
}