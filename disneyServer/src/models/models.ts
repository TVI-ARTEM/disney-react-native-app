import {STRING} from "sequelize";

const sequelize = require('../db')
const {DataTypes} = require('sequelize')

export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})


export const Group = sequelize.define('group', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true}
})

export const GroupCharacters = sequelize.define('groupUser', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    characterId: {type: DataTypes.INTEGER},
    characterName: {type: DataTypes.STRING}
})


export const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    characterId: {type: DataTypes.INTEGER},
    comment: {type: DataTypes.STRING}
})

User.hasMany(Group)
Group.belongsTo(User)

Group.hasMany(GroupCharacters)
GroupCharacters.belongsTo(Group)

User.hasMany(Comment)
Comment.belongsTo(User)

module.exports = {
    User,
    Group,
    GroupCharacters,
    Comment
}