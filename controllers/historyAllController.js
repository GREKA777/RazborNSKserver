const {History_All} = require('../models/models')
const ApiError = require("../error/ApiError")

class HistoryAllController{
    async create(req, res){
        const {historyId, tiersId, autoPartId} = req.body
        const history_All = await History_All.create({historyId, tiersId, autoPartId})
        return res.json(history_All)
    }
    async getAll(req, res){
        const history_Alls = await History_All.findAll()
        return res.json(history_Alls)
    }
}

module.exports = new HistoryAllController()