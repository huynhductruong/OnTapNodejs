import express from 'express'
import dotenv from 'dotenv'
import route  from './routes/index.js'
import connect from './databases/mongoDB.js'
import path  from 'path'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded(
    {
        extended:true
    }
))
route(app)
app.use(express.static(path.join('E:/Web/OnTapNodejs','public')))
app.listen(process.env.PORT,()=> 
{
    
    console.log(`RUNNING IN PORT = ${process.env.PORT}`)
})