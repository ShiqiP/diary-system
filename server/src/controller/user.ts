import { RequestHandler } from "express";
import { UserModel, User } from "../model/user";
import { ResponseBodyType, getResponseBody } from '../utils'
import jwt from 'jsonwebtoken'


export const signUpHandler: RequestHandler<unknown, ResponseBodyType<null>, User, unknown> = async (req, res, next) => {
    try {
        const user = req.body
        const result = await UserModel.create(user);
        res.json()
    } catch (e) {
        if (e.code === 11000) {
            next(getResponseBody(null, 400, "Error: duplicate email"));
        } else {
            next(e);
        }
    }
}

export const signInHandler: RequestHandler<unknown, ResponseBodyType<Partial<User>>, { email: string, password: string }, unknown> = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const result = await UserModel.findOne({ email, password });
        if (result !== null) {
            // return jwt
            const token = jwt.sign(
                {
                    email: result.email,
                    fullname: result.fullname
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: 60
                })
            res.json(getResponseBody({ email: result.email, fullname: result.fullname, picture_url: result.picture_url, token }, 200))
        } else {
            next(getResponseBody(null, 400, "Email or password is not correct"))
        }
    } catch (e) {
        next(e);
    }
}
