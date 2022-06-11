const {History, Tiers, AutoPart, History_All} = require('../models/models')
const ApiError = require("../error/ApiError")

class HistoryController {
    async create(req, res, next) {
        const {userId, autopartId, tierId} = req.body
        let id
        const historyId = await History.findOne({where: {userId}})
        if (!historyId) {
            return next(ApiError.badRequest("Не удалось найти историю"))
        }
        if (autopartId && !tierId) {
            id = {autopartId, historyId: historyId.id}
        }
        if (!autopartId && tierId) {
            id = {tierId, historyId: historyId.id}
        }
        const check = await History_All.findOne({where: id})
        if (check) {
            return next(ApiError.badRequest("Товар уже в истории"))
        }
        const history = await History_All.create(id)
        return res.json(history)
    }

    async getAll(req, res) {
        let {userId, limit, page} = req.query
        page = page || 1
        limit = limit || 12
        let offset = page * limit - limit
        let rows = []
        const historyId = await History.findOne({where: {userId}})
        const historys = await History_All.findAndCountAll({
            order: [["createdAt", "DESC"]],
            where: {historyId: historyId.id},
            limit,
            offset
        })
        const count = historys.count
        for (let i = 0; i < historys.rows.length; i++) {
            let f
            if (historys.rows[i].tierId) {
                f = await Tiers.findOne({where: {id: historys.rows[i].tierId}})
            }
            if (historys.rows[i].autopartId) {
                f = await AutoPart.findOne({where: {id: historys.rows[i].autopartId}})
            }
            rows = [...rows, f]
        }
        return res.json({count, rows})
    }

    async getOne(req, res, next) {
        const {userId, autopartId, tierId} = req.query
        let id
        const historyId = await History.findOne({where: {userId}})
        if (!historyId) {
            return next(ApiError.badRequest("Не удалось найти историю"))
        }
        if (autopartId && !tierId) {
            id = {autopartId, historyId: historyId.id}
        }
        if (!autopartId && tierId) {
            id = {tierId, historyId: historyId.id}
        }
        const fav = await History_All.findOne({where: id})
        return res.json(fav)
    }

    async delete(req, res) {
        const {userId, autopartId, tierId} = req.query
        let id
        const historyId = await History.findOne({where: {userId}})
        if (!historyId) {
            return next(ApiError.badRequest("Не удалось найти историю"))
        }
        if (autopartId && !tierId) {
            id = {autopartId, historyId: historyId.id}
        }
        if (!autopartId && tierId) {
            id = {tierId, historyId: historyId.id}
        }
        const fav = await History_All.destroy({where: id})
        return res.json(null)
    }

    async deleteAll(req, res) {
        const {userId} = req.query
        const historyId = await History.findOne({where: {userId}})
        if (!historyId) {
            return next(ApiError.badRequest("Не удалось найти историю"))
        }
        const fav = await History_All.destroy({where: {historyId: historyId.id}})
        return res.json(null)
    }
}

module.exports = new HistoryController()