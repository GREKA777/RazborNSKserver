const {Delivery} = require('../models/models')
const ApiError = require("../error/ApiError")

class DeliveryController{
    async create(req, res){
        const {name} = req.body
        const delivery = await Delivery.create({name})
        return res.json(delivery)
    }
    async getAll(req, res){
        const deliverys = await Delivery.findAll()
        return res.json(deliverys)
    }
}

module.exports = new DeliveryController()