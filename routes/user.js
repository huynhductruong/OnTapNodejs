import express from 'express'
import {userController} from '../controllers/index.js'
import { query,body } from "express-validator"
import authToken from '../middlewares/authToken.js'
const route =  express.Router()
route.post('/login',body('email').isEmail(),body('password').isLength({min:5}),userController.login)
route.post('/register',userController.register)
route.get('/authorization',authToken,userController.Authorization)
route.post('/update/:id',userController.updateUser)
export default route
