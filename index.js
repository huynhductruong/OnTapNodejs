import express from 'express'
import dotenv from 'dotenv'
import route  from './routes/index.js'
import connect from './databases/mongoDB.js'
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded(
    {
        extended:true
    }
))
route(app)

app.listen(process.env.PORT,()=> 
{
    connect()
    console.log(`RUNNING IN PORT = ${process.env.PORT}`)
})