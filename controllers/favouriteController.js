const {Favourite, Favourite_All, Tiers, AutoPart} = require('../models/models')
const ApiError = require("../error/ApiError")
const { Op } = require("sequelize");

class FavouriteController{
    async create(req, res, next){
        const {userId, autopartId, tierId} = req.body
        let id
        const favouriteId = await Favourite.findOne({where:{userId}})
        if (!favouriteId) {
            return next(ApiError.badRequest("Не удалось найти избранное"))
        }
        if (autopartId && !tierId) {
            id = {autopartId, favouriteId: favouriteId.id}
        }
        if (!autopartId && tierId) {
            id = {tierId, favouriteId: favouriteId.id}
        }
        const check = await Favourite_All.findOne({where: id})
        if (check) {
            return next(ApiError.badRequest("Товар уже в избранном"))
        }
        const favourite = await Favourite_All.create(id)
        return res.json(favourite)
    }
    async getAll(req, res){
        let {userId, limit, page} = req.query
        page = page || 1
        limit = limit || 12
        let offset = page*limit - limit
        let rows = []
        const favouriteId = await Favourite.findOne({where:{userId}})
        const favourites = await Favourite_All.findAndCountAll({ order: [["createdAt", "DESC"]], where: {favouriteId: favouriteId.id}, limit, offset})
        const count = favourites.count
        for (let i = 0; i < favourites.rows.length; i++){
            let f
            if (favourites.rows[i].tierId){
                f = await Tiers.findOne({where:{id: favourites.rows[i].tierId}})
            }
            if (favourites.rows[i].autopartId){
                f = await AutoPart.findOne({where:{id: favourites.rows[i].autopartId}})
            }
            rows = [...rows, f]
        }
        return res.json({count, rows})
    }
    async getOne(req, res, next){
        const {userId, autopartId, tierId} = req.query
        let id
        const favouriteId = await Favourite.findOne({where:{userId}})
        if (!favouriteId) {
            return next(ApiError.badRequest("Не удалось найти избранное"))
        }
        if (autopartId && !tierId) {
            id = {autopartId, favouriteId: favouriteId.id}
        }
        if (!autopartId && tierId) {
            id = {tierId, favouriteId: favouriteId.id}
        }
        const fav = await Favourite_All.findOne({where: id})
        return res.json(fav)
    }
    async delete(req, res){
        const {userId, autopartId, tierId} = req.query
        let id
        const favouriteId = await Favourite.findOne({where:{userId}})
        if (!favouriteId) {
            return next(ApiError.badRequest("Не удалось найти избранное"))
        }
        if (autopartId && !tierId) {
            id = {autopartId, favouriteId: favouriteId.id}
        }
        if (!autopartId && tierId) {
            id = {tierId, favouriteId: favouriteId.id}
        }
        const fav = await Favourite_All.destroy({where: id})
        return res.json(null)
    }
    async deleteAll(req, res){
        const {userId} = req.query
        const favouriteId = await Favourite.findOne({where:{userId}})
        if (!favouriteId) {
            return next(ApiError.badRequest("Не удалось найти избранное"))
        }
        const fav = await Favourite_All.destroy({where: {favouriteId: favouriteId.id}})
        return res.json(null)
    }
}

module.exports = new FavouriteController()