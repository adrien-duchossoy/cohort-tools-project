const router = require("express").Router()

const { verifyToken } = require ("../middlewares/auth.middlewares")
const User = require("../models/User.model")

router.get("/", verifyToken, async (req, res) => {
    console.log(req.playload)
    
    try {
        const foundUser = await User.findById(req.payload._id)
        res.json(foundUser)
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router