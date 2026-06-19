const User = require("../models/User.model")

const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { verifyToken } = require("../middlewares/auth.middlewares")

router.post("/signup", async (req, res, next) => {

    console.log(req.body)
    const { email, password, name } = req.body

    if (!email || !password) {
        res.status(400).json({errorMessage: "Email and Password are required"})
        return
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    if(passwordRegex.test(password) === false) {
        res.status(400).json({errorMessage: "Password is not strong enough"})
        return
    }


    try {
        const foundUser = await User.findOne({email: email})

        if(foundUser) {
            res.status(400).json({errorMessage: "User already exists"})
            return
        }

        const hashPassword = await bcrypt.hash(password, 12)
    
        const newUser = {
            email: email,
            password: hashPassword,
            name: name
        }
        
        await User.create(newUser)
        res.status(201).send("user created")
        
    } catch (error) {
        next(error)
    }

})


router.post("/login", async (req, res, next) => {

    const { email, password } = req.body

    if(!email || !password) {
        res.status(400).json({errorMessage: "Email and password are required"})
        return
    }

    try {
        const foundUser = await User.findOne({email: email})

        if(!foundUser) {
            res.status(400).json({errorMessage: "User not found with that email. Signup"})
            return
        }

        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)

        if(!isPasswordCorrect) {
            res.status(400).json({errorMessage: "Password incorrect"})
            return
        }

        const payload = {
            _id: foundUser._id,
            email: foundUser.email
        }

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: "7d"
        })

        res.status(200).json({authToken: authToken})

    } catch (error) {
        next(error)
    }
})


router.get("/verify", verifyToken, (req, res) => {
    res.status(200).json(req.playload)
})

module.exports = router