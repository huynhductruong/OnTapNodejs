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
        gender: {
            type: String,
            enum: {
                values: ['Male', 'Famale'],
                message: '{VALUE is not supported}'
            },
            require: true
        }
    },
        {
            autoCreate: true,
            autoIndex: true
        })
)