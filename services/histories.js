import { HistoryModel } from "../models/index.js"

const addHistory = async ({ typeProcessing, image, imageProcessing, comments, idUser }) => {
    await HistoryModel.create({ typeProcessing, image, imageProcessing, comments, idUser })
}
const getHistoryByIdUser = async ({ idUser }) => {
    try {
        let histories = await HistoryModel.find({ idUser })

        return histories
    } catch (error) {
        console.log(error);
    }
}
const removeHistories = async () => {
    await HistoryModel.deleteMany({})

}
export default {
    addHistory,
    getHistoryByIdUser,
    removeHistories
}