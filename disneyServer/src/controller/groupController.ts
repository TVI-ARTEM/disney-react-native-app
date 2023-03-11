import {Request, Response, NextFunction} from 'express';
import {Comment, Group, GroupCharacters, User} from '../models/models';
import ApiError from "../error/ApiError";
import {where} from "sequelize";


class GroupController {
    async createGroup(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('create-group')
            const {email, group} = req.body

            if (!email || !group) {
                return next(ApiError.badRequest('Incorrect e-mail, group!'))
            }

            const user = await User.findOne({where: {email: email}})
            if (!user) {
                return next(ApiError.badRequest('User is not found!'))
            }

            const newGroup = await Group.create({userId: user.id, name: group})

            return res.json({group: newGroup})
        } catch (e) {
            return next(e)
        }
    }

    async getGroups(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('get-groups')
            const {email} = req.query

            if (!email) {
                return next(ApiError.badRequest('Incorrect e-mail!'))
            }

            const user = await User.findOne({where: {email: email}})
            if (!user) {
                return next(ApiError.badRequest('User is not found!'))
            }

            const groups = await Group.findAll({where: {userId: user.id}})

            return res.json({groups: groups})
        } catch (e) {
            return next(e)
        }
    }

    async getGroupCharacters(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('get-group-characters')
            const {email, group} = req.query

            if (!email || !group) {
                return next(ApiError.badRequest('Incorrect e-mail, group!'))
            }


            const user = await User.findOne({where: {email: email}})
            if (!user) {
                return next(ApiError.badRequest('User is not found!'))
            }

            const groupEntity = await Group.findOne({where: {name: group, userId: user.id}})
            if (!groupEntity) {
                return next(ApiError.badRequest('Group is not found!'))
            }


            const characters = await GroupCharacters.findAll({where: {groupId: groupEntity.id}})

            return res.json({characters: characters})
        } catch (e) {
            return next(e)
        }
    }


}

module.exports = new GroupController()