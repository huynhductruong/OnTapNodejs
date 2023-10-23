import express from 'express'
import {userController} from '../controllers/index.js'
import { query,body } from "express-validator"
const route =  express.Router()
route.post('/insert',userController.addUser)
route.patch('/update/:id',userController.updateUser)
route.delete('/delete/:id',userController.deleteUser)
route.post('/login',body('email').isEmail(),body('password').isLength({min:5}),userController.login)
route.post('/register',userController.register)
route.get('/page/:page',userController.getUserByPage)
route.get('/:id',query('id').notEmpty(),userController.getUserByID)
route.get('/',userController.getAllUser)
export default route