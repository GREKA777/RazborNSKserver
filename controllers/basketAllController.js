const {Basket_All} = require('../models/models')
const ApiError = require("../error/ApiError")

class BasketAllController{
    async create(req, res){
        const {basketId, tiersId, autoPartId} = req.body
        const basket_All = await Basket_All.create({basketId, tiersId, autoPartId})
        return res.json(basket_All)
    }
    async getAll(req, res){
        const basket_Alls = await Basket_All.findAll()
        return res.json(basket_Alls)
    }
}

module.exports = new BasketAllController()