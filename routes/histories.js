import express from 'express'
import {historiesController} from '../controllers/index.js'


const route =  express.Router()
route.post('/',historiesController.addHistory)
route.get('/:id',historiesController.getHistoryByIdUser)
route.delete('/',historiesController.removeHistories)
export default route