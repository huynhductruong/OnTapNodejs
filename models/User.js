import mongoose, { Schema, ObjectId } from 'mongoose'
import validator from 'validator'
export default mongoose.model('User',
    new Schema({
        name: {
            type: String,
            require: true,
            validate: {
                validator: value => value.length > 3,
                message: 'Username must be at least 3 characters'
            }
        },
        email: {
            type: String,
            require: true,
            validate: {
                validator: value => validator.isEmail,
                message: 'Email is incorrect format'
            }
        },
        password: {
            type: String,
            require: true,
            validate: {
                validator: value => value.length >= 5,
                message: 'Password must be at least 4 characters'
            }
        }
    },
        {
            autoCreate: true,
            autoIndex: true
        })
)