import express from 'express'
import {userController} from '../controllers/index.js'
import { query,body } from "express-validator"
import upload from '../middlewares/uploadImage.js'
const route =  express.Router()
route.post('/login',body('email').isEmail(),body('password').isLength({min:5}),userController.login)
route.post('/register',userController.register)
export default route
