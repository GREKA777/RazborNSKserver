const {Favourite_All} = require('../models/models')
const ApiError = require("../error/ApiError")

class FavouriteAllController{
    async create(req, res){
        const {favouriteId, tiersId, autoPartId} = req.body
        const favourite_All = await Favourite_All.create({favouriteId, tiersId, autoPartId})
        return res.json(favourite_All)
    }
    async getAll(req, res){
        const favourite_Alls = await Favourite_All.findAll()
        return res.json(favourite_Alls)
    }
}

module.exports = new FavouriteAllController()