import express from 'express'
import {userController} from '../controllers/index.js'
const route =  express.Router()
route.post('/insert',userController.addUser)
route.patch('/update/:id',userController.updateUser)
route.delete('/delete/:id',userController.deleteUser)
route.post('/login',userController.login)
route.post('/register',userController.register)
route.get('/page/:page',userController.getUserByPage)
route.get('/:id',userController.getUserByID)
route.get('/',userController.getAllUser)
export default route
