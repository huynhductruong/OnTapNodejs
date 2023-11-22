import express from 'express'
import {userController} from '../controllers/index.js'
import upload from '../middlewares/uploadImage.js'
const route =  express.Router()
route.post('/denoisis',upload.any(),userController.Denoising)
route.post('/diagnosis',upload.any(),userController.Diagnosis)
export default route