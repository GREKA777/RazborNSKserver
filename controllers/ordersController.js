const {Orders} = require('../models/models')
const ApiError = require("../error/ApiError")

class OrdersController{
    async create(req, res){
        const {userId, orderDataId} = req.body
        const order = await Orders.create({userId, orderDataId})
        return res.json(order)
    }
    async getAll(req, res){
        const orders = await Orders.findAll()
        return res.json(orders)
    }
}

module.exports = new OrdersController()