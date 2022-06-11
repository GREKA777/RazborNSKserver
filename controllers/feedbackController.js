const {Feedback} = require('../models/models')
const ApiError = require("../error/ApiError")

class FeedbackController{
    async create(req, res){
        const {userId, text} = req.body
        const feedback = await Feedback.create({userId, text})
        return res.json(feedback)
    }
    async getAll(req, res){
        const feedbacks = await Feedback.findAll()
        return res.json(feedbacks)
    }
}

module.exports = new FeedbackController()