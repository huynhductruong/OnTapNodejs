import { UserModel,AccountModel } from "../models/index.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const login = async ({email,password})=>
{
    try {
        const user = await AccountModel.findOne({email,password})
        if(!!user) 
        {
            let accessToken = jwt.sign({...user,password:'NOT SHOW'},process.env.SECRET_KEY)
            return accessToken
        }
        else throw "USER NOT FOUND"
    } catch (error) {
       throw "CAN NOT LOGIN"
    }
}
const register = async ({email,password})=>
{
    try {
        const exisUser = await AccountModel.findOne({email})
        if(!!exisUser) throw new Error("USER EXISTING")
        const newUser = await AccountModel.create({email,password})
        
        return newUser
    } catch (error) {
        throw 'CAN NOT REGISTER'
    }
}
const getAllUser = async ()=>
{
    try {
        const users = await UserModel.find({})
        return users
    } catch (error) {
       throw error
    }
}
const getUserByID = async ({id})=>
{
    try {
        const users = await UserModel.findById(id)
        if(!!users) return users
        else  throw 'NULL'
    } catch (error) {
        throw error
    }
}
const addUser = async ({name,email,gender})=>
{
    try {
        const newuser =await UserModel.create({name,email,gender})
        
        return newuser
    } catch (error) {
        throw "CAN NOT ADD USER"
    }
}
const updateUser = async ({id,valueUpdate})=>
{
    try {
        
        const user = await UserModel.updateOne({_id:id},{...valueUpdate})
       
        return user
    } catch (error) {
        throw "CAN NOT ADD USER"
    }
}
const deleteUser = async ({id})=>
{
    try {
        
        await UserModel.deleteOne({_id:id})
        return "OK"
    } catch (error) {
        throw "CAN NOT DELETE USER"
    }
}
const getUserByPage  = async ({page,size}) =>
{
    try {
        let filterData = UserModel.aggregate([
            {$match:{
                name:{$regex :"truo",$options:'i'},
                
            }},
            {$skip: (page-1)*size},
            {$limit:size}
        ])
        return filterData
    } catch (error) {
        throw error
    }
}
export default {
    login,
    register,
    getAllUser,
    getUserByID,
    addUser,
    updateUser,
    deleteUser,
    getUserByPage
}