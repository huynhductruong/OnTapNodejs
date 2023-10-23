
import { userService, } from '../services/index.js'
const login = async (req, res) => {
    try {
        
        let { email, password } = req.body
        let data = await userService.login({ email, password })
        if(!!data)  res.status(200).json(data)
        else res.status(400).json({message:"NOT MATCH"})
        
    } catch (error) {
        res.status(500).json({error})
    }
}
const register = async (req, res) => {
    try {
        const { email, password } = req.body
       let newUser =  await userService.register({ email, password })
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }
}
const getAllUser = async (req, res) => {
    try {
        let data = await userService.getAllUser()
        res.status(200).json({
            ...data,
            message: 'OK'
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
const getUserByID = async (req, res) => {
    try {
        const { id } = req.params
        let data = await userService.getUserByID({ id })
        res.send(data)
    } catch (error) {
        res.status(404).json({
            message: "NOT FOUND USER"
        })
    }
}
const addUser = async (req, res) => {
    try {
        const {name,email,gender} = req.body
        let newuser = await userService.addUser({name,email,gender})
        res.status(201).json(newuser)
    } catch (error) {
        res.status(500).json(error)
    }
}
const updateUser = async (req, res) => {
    try {
        const {id} = req.params
        const valueUpdate = {...req.body}
        
        let newuser = await userService.updateUser({id,valueUpdate})
        res.status(201).json(newuser)
    } catch (error) {
        res.status(500).json(error)
    }
}
const deleteUser = async (req,res) =>
{
    try {
        const {id} = req.params
        
        await userService.deleteUser({id})
        res.status(201).json({message:"DELETE SUCCESSFUL"})
    } catch (error) {
        res.status(500).json(error)
    }
}
const getUserByPage = async (req,res) =>
{
    try {
        const {page} = req.params
        
        let data = await userService.getUserByPage({page,size:3})
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}
export default {
    getAllUser,
    getUserByID,
    addUser,
    login,
    register,
    updateUser,
    deleteUser,
    getUserByPage
}
