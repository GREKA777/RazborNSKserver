const {Connect} = require('../models/models')
const ApiError = require("../error/ApiError")

class ConnectController{
    async create(req, res){
        const {name, userId, email, topic, text} = req.body
        const connect = await Connect.create({name, userId, email, topic, text})
        return res.json(connect)
    }
    async getAll(req, res){
        const connects = await Connect.findAll()
        return res.json(connects)
    }
    async delete(req, res) {
        const {id} = req.query
        const connect = await Connect.destroy({where: {id}})
        return res.json(connect)
    }
}

module.exports = new ConnectController()