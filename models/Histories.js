import mongoose, { Schema, ObjectId } from 'mongoose'
export default mongoose.model('History',
    new Schema({
        typeProcessing: {
            type: String,
            require: true,
        },
        idUser:
        {
            type: ObjectId,
            require:true

        },
        image: {
            type: String,
            require: true,
           
        },
        imageProcessing: {
            type: String,
            require: true,
            
        },
        comments:{
            type:Array,

        }
       
    },
        {
            timestamps:true,
            autoCreate: true,
            autoIndex: true
        })
)