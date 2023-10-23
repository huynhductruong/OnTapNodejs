import mongoose, { Schema, ObjectId } from 'mongoose'
import validator from 'validator'
export default mongoose.model('Account',
    new Schema({
        id: { type: ObjectId },
       
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
                validator: value => value.length>5,
                message: 'password is incorrect format'
            }
        }
    },
        {
            
            autoCreate: true,
            autoIndex: true,
            methods:{
                async TestMethod({email,password}){
                    console.log(email,password);
                    let data = await mongoose.model('Account').find({})
                    return data
                }
            },
            statics:{
                async FindByTestCase({test}){
                    console.log(test);
                }
            }
        })
)