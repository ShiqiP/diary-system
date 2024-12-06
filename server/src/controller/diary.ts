import { RequestHandler } from "express";
import { getResponseBody, ResponseBodyType } from "../utils";
import { Diary, DiaryModel } from "../model/diary";

export const getList: RequestHandler<unknown, ResponseBodyType<Diary[]>, unknown, unknown> = async (req, res, next) => {
    try {
        const result = await DiaryModel.find();
        res.json(getResponseBody(result))
    } catch (e) {
        next(e)
    }
}

export const get: RequestHandler<{ id: string }, ResponseBodyType<Diary | null>, unknown, unknown> = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await DiaryModel.find({ _id: id })
        if (result) {
            res.json(getResponseBody())
        } else {
            res.json(getResponseBody(null, 404, "diary not found"))
        }
    } catch (e) {
        next(e)
    }
}

export const deleteHandler: RequestHandler<{ id: string }, ResponseBodyType, unknown, unknown> = async (req, res, next) => {
    try {
        const { id } = req.params;
        await DiaryModel.deleteOne({ _id: id })
        res.json(getResponseBody())
    } catch (e) {
        next(e)
    }
}

export const create: RequestHandler<unknown, ResponseBodyType, Diary, unknown> = async (req, res, next) => {
    try {
        const diary = req.body;
        await DiaryModel.create(diary);
        res.json(getResponseBody())
    } catch (e) {
        next(e)
    }
}

export const update: RequestHandler<{ id: string, title: string, description: string }, ResponseBodyType, unknown, unknown> = async (req, res, next) => {
    try {
        const { title, id, description } = req.params;
        await DiaryModel.deleteOne({ _id: id, title, description })
        res.json(getResponseBody())
    } catch (e) {
        next(e)
    }
}