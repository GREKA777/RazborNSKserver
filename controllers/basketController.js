const {Basket, Tiers, AutoPart, Basket_All} = require('../models/models')
const ApiError = require("../error/ApiError")
const { Op } = require("sequelize");

class BasketController{
    async create(req, res, next){
        const {userId, autopartId, tierId} = req.body
        let id
        const basketId = await Basket.findOne({where:{userId}})
        if (!basketId) {
            return next(ApiError.badRequest("Не удалось найти корзину"))
        }
        if (autopartId && !tierId) {
            id = {autopartId, basketId: basketId.id}
        }
        if (!autopartId && tierId) {
            id = {tierId, basketId: basketId.id}
        }
        const check = await Basket_All.findOne({where: id})
        if (check) {
            return next(ApiError.badRequest("Товар уже в корзине"))
        }
        const basket = await Basket_All.create(id)
        return res.json(basket)
    }
    async getAll(req, res){
        let {userId, limit, page} = req.query
        page = page || 1
        limit = limit || 12
        let offset = page*limit - limit
        let rows = []
        let sum = 0
        const basketId = await Basket.findOne({where:{userId}})
        const baskets = await Basket_All.findAndCountAll({ order: [["createdAt", "DESC"]], where: {basketId: basketId.id}, limit, offset})
        const bas = await Basket_All.findAndCountAll({ order: [["createdAt", "DESC"]], where: {basketId: basketId.id}})
        const count = baskets.count
        for (let i = 0; i < bas.count; i++){
            let f
            if (bas.rows[i].tierId){
                f = await Tiers.findOne({where:{id: bas.rows[i].tierId}})
            }
            if (bas.rows[i].autopartId){
                f = await AutoPart.findOne({where:{id: bas.rows[i].autopartId}})
            }
            sum = sum + f.price
        }
        for (let i = 0; i < baskets.rows.length; i++){
            let f
            if (baskets.rows[i].tierId){
                f = await Tiers.findOne({where:{id: baskets.rows[i].tierId}})
            }
            if (baskets.rows[i].autopartId){
                f = await AutoPart.findOne({where:{id: baskets.rows[i].autopartId}})
            }
            rows = [...rows, f]
        }
        return res.json({count, rows, sum})
    }
    async getOne(req, res, next){
        const {userId, autopartId, tierId} = req.query
        let id
        const basketId = await Basket.findOne({where:{userId}})
        if (!basketId) {
            return next(ApiError.badRequest("Не удалось найти корзину"))
        }
        if (autopartId && !tierId) {
            id = {autopartId, basketId: basketId.id}
        }
        if (!autopartId && tierId) {
            id = {tierId, basketId: basketId.id}
        }
        const fav = await Basket_All.findOne({where: id})
        return res.json(fav)
    }
    async delete(req, res){
        const {userId, autopartId, tierId} = req.query
        let id
        const basketId = await Basket.findOne({where:{userId}})
        if (!basketId) {
            return next(ApiError.badRequest("Не удалось найти корзину"))
        }
        if (autopartId && !tierId) {
            id = {autopartId, basketId: basketId.id}
        }
        if (!autopartId && tierId) {
            id = {tierId, basketId: basketId.id}
        }
        const fav = await Basket_All.destroy({where: id})
        return res.json(null)
    }
    async deleteAll(req, res){
        const {userId} = req.query
        const basketId = await Basket.findOne({where:{userId}})
        if (!basketId) {
            return next(ApiError.badRequest("Не удалось найти корзину"))
        }
        const fav = await Basket_All.destroy({where: {basketId: basketId.id}})
        return res.json(null)
    }
}

module.exports = new BasketController()