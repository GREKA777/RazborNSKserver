const uuid = require('uuid')
const path = require('path');
const {OrderData} = require('../models/models')
const ApiError = require("../error/ApiError")

class OrderDataController{
    async create(req, res){
        const {num, status, userId, deliveryId, autoPartId, tiersId} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const orderData = await OrderData.create({num, status, userId, deliveryId, autoPartId, tiersId, img: fileName})
        return res.json(orderData)
    }
    async getAll(req, res){
        const orderDatas = await OrderData.findAll()
        return res.json(orderDatas)
    }
    async getOne(req, res){
        const {id} = req.params
        const orderData = await OrderData.findOne(
            {
                where: {id}
            },
        )
        return res.json(orderData)
    }
}

module.exports = new OrderDataController()