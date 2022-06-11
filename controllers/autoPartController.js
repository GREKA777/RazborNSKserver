const uuid = require('uuid')
const path = require('path');
const {AutoPart, Basket_All, Favourite_All, History_All} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require("sequelize");

class AutoPartController {
    async create(req, res, next) {
        try {
            const {name, num, year, car, engine, run, description, typeId, price} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const autoPart = await AutoPart.create({
                name,
                num,
                year,
                car,
                engine,
                run,
                description,
                typeId,
                price,
                img: fileName
            })
            return res.json(autoPart)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {car, typeId, name, limit, page, sort} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let autoParts;
        let sortAutoPart = [["createdAt", "DESC"]]
        if (sort === 'PriceDown') {
            sortAutoPart = [['price', 'DESC']]
        }
        if (sort === 'PriceUp') {
            sortAutoPart = [['price', 'ASC']]
        }
        if (sort === 'TimeDown') {
            sortAutoPart = [['createdAt', 'DESC']]
        }
        if (sort === 'TimeUp') {
            sortAutoPart = [['createdAt', 'ASC']]
        }
        if (!car && !typeId && !name) {
            autoParts = await AutoPart.findAndCountAll({order: sortAutoPart, limit, offset})
        }
        if (car && !typeId && !name) {
            autoParts = await AutoPart.findAndCountAll({order: sortAutoPart, where: {car}, limit, offset})
        }
        if (!car && typeId && !name) {
            autoParts = await AutoPart.findAndCountAll({order: sortAutoPart, where: {typeId}, limit, offset})
        }
        if (car && typeId && !name) {
            autoParts = await AutoPart.findAndCountAll({order: sortAutoPart, where: {typeId, car}, limit, offset})
        }
        if (car && typeId && name) {
            autoParts = await AutoPart.findAndCountAll({order: sortAutoPart, where: {typeId, car, name}, limit, offset})
            if (autoParts.count === 0) {
                autoParts = await AutoPart.findAndCountAll({order: sortAutoPart, where: {typeId, car, num: name}, limit, offset})
            }
        }
        if (car && !typeId && name) {
            autoParts = await AutoPart.findAndCountAll({order: sortAutoPart, where: {car, name}, limit, offset})
            if (autoParts.count === 0) {
                autoParts = await AutoPart.findAndCountAll({order: sortAutoPart, where: {car, num: name}, limit, offset})
            }
        }
        if (!car && typeId && name) {
            autoParts = await AutoPart.findAndCountAll({order: sortAutoPart, where: {typeId, name}, limit, offset})
            if (autoParts.count === 0) {
                autoParts = await AutoPart.findAndCountAll({order: sortAutoPart, where: {typeId, num: name}, limit, offset})
            }
        }
        if (!car && !typeId && name) {
            autoParts = await AutoPart.findAndCountAll({order: sortAutoPart, where: {name}, limit, offset})
            if (autoParts.count === 0) {
                autoParts = await AutoPart.findAndCountAll({order: sortAutoPart, where: {num: name}, limit, offset})
            }
        }
        return res.json(autoParts)
    }

    async getOne(req, res) {
        const {id} = req.params
        const autoPart = await AutoPart.findOne(
            {
                where: {id}
            },
        )
        return res.json(autoPart)
    }

    async delete(req, res) {
        const {id} = req.query
        await Basket_All.destroy({where: {autopartId: id}})
        await Favourite_All.destroy({where: {autopartId: id}})
        await History_All.destroy({where: {autopartId: id}})
        const autoPart = await AutoPart.destroy({where: {id}})
        return res.json(autoPart)
    }

    async getRecommendation(req, res, next) {
        try {
            const page =  1
            const limit =  4
            let offset = page * limit - limit

            const randOne = Math.floor(Math.random() * (7 - 1)) + 1;

            const autoParts = await AutoPart.findAll({order: [['createdAt', 'DESC']], where:{ [Op.or]: { typeId: randOne }}, limit, offset})
            return res.json(autoParts)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new AutoPartController()