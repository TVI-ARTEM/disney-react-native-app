import {Request, Response, NextFunction} from 'express';
import {Comment, Group, GroupCharacters, User} from '../models/models';
import ApiError from "../error/ApiError";
import {where} from "sequelize";


class CommentController {
    async createComment(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('create-comment')
            const {email, comment, id} = req.body

            if (!email || !comment || !id) {
                return next(ApiError.badRequest('Incorrect e-mail, comment or id!'))
            }

            const user = await User.findOne({where: {email: email}})
            if (!user) {
                return next(ApiError.badRequest('User is not found!'))
            }

            const newComment = await Comment.create({userId: user.id, comment: comment, characterId: id})

            return res.json({comment: newComment})
        } catch (e) {
            return next(e)
        }
    }

    async getComments(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('get-comments')
            const {email, id} = req.query
            console.log(email)
            console.log(id)

            if (!email || !id) {
                return next(ApiError.badRequest('Incorrect e-mail or id!'))
            }

            const user = await User.findOne({where: {email: email}})
            if (!user) {
                return next(ApiError.badRequest('User is not found!'))
            }

            const comments = await Comment.findAll({where: {userId: user.id, characterId: id}})

            return res.json({comments: comments})
        } catch
            (e) {
            return next(e)
        }
    }


}

module
    .exports = new CommentController()