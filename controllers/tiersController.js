const uuid = require('uuid')
const path = require('path');
const {Tiers, Basket_All, Favourite_All, History_All, AutoPart} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require("sequelize");

class TiersController {
    async create(req, res, next) {
        try {
            const {name, num, width, profile, diameter, count, price} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const tiers = await Tiers.create({name, num, width, profile, diameter, count, price, img: fileName})
            return res.json(tiers)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async getAll(req, res) {
        let {profile, diameter, name, count, width, limit, page, sort} = req.query
        let findFilter;
        let sortTiers = [["createdAt", "DESC"]]
        if (sort === 'PriceDown') {
            sortTiers = [['price', 'DESC']]
        }
        if (sort === 'PriceUp') {
            sortTiers = [['price', 'ASC']]
        }
        if (sort === 'TimeDown') {
            sortTiers = [['createdAt', 'DESC']]
        }
        if (sort === 'TimeUp') {
            sortTiers = [['createdAt', 'ASC']]
        }
        if (profile) {
            findFilter = {profile}
        }
        if (diameter) {
            findFilter = {...findFilter, diameter}
        }
        if (width) {
            findFilter = {...findFilter, width}
        }
        if (count) {
            findFilter = {...findFilter, count}
        }
        if (name) {
            findFilter = {...findFilter, name}
        }

        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit

        let tierss
        if(findFilter ==={}){
            tierss = await Tiers.findAndCountAll({order: sortTiers, limit, offset})
        }else{
            tierss = await Tiers.findAndCountAll({order: sortTiers, where: findFilter, limit, offset})
        }
        return res.json(tierss)
    }

    async getOne(req, res) {
        const {id} = req.params
        const tiers = await Tiers.findOne({
            where: {id}
        })
        return res.json(tiers)
    }

    async delete(req, res) {
        const {id} = req.query
        await Basket_All.destroy({where: {tierId: id}})
        await Favourite_All.destroy({where: {tierId: id}})
        await History_All.destroy({where: {tierId: id}})
        const tiers = await Tiers.destroy({where: {id}})
        return res.json(tiers)
    }
    async getRecommendation(req, res, next) {
        try {
            const page =  1
            const limit =  4
            let offset = page * limit - limit

            const randOne = Math.floor(Math.random() * (4 - 1)) + 1;

            const tiers = await Tiers.findAll({order: [['createdAt', 'DESC']], where:{ [Op.or]: { count: randOne }}, limit, offset})
            return res.json(tiers)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new TiersController()