const { Schema, model } = require("mongoose")

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required.'],
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        name: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const User = model("User", userSchema)

module.exports = User