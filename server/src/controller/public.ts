import { RequestHandler } from "express";
import jwt from 'jsonwebtoken'
import { getResponseBody } from "../utils";

export const verifyToken: RequestHandler = (req, res, next) => {
    try {
        const { Authorization } = req.headers
        jwt.verify(Authorization, process.env.TOKEN_KEY, (err, decoded) => {
            if (err) {
                next(getResponseBody(null, 401, err.name))
            }
            if (decoded) {
                next();
            }
        });
    } catch (e) {
        next(e)
    }
}