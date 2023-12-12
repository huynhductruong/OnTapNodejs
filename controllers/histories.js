import { historiesService } from "../services/index.js"

const addHistory = async (req,res) =>
{
    try {
        console.log(req.body);
        await historiesService.addHistory({...req.body})
        res.status(200).send('OK')
    } catch (error) {
        console.log(error);
    }
}
const getHistoryByIdUser = async (req,res) =>
{
    try {
        let idUser = req.params.id
       
        let data = await historiesService.getHistoryByIdUser({idUser})
        res.json(data)
    } catch (error) {
        
    }
}
const removeHistories = async (req,res) =>
{
    try {
        await historiesService.removeHistories()
    } catch (error) {
        
    }
}
export default 
{
    addHistory,
    getHistoryByIdUser,
    removeHistories
}