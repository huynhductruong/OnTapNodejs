import { UserModel } from "../models/index.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { exec } from 'child_process'
dotenv.config()
const login = async ({ email, password }) => {
    try {
        const user = await UserModel.findOne({ email, password })
        if (!!user) {
   
            let accessToken = jwt.sign({ ...user._doc, password: 'NOT SHOW' }, process.env.SECRET_KEY)
            return accessToken
        }
        else throw "USER NOT FOUND"
    } catch (error) {
        throw "CAN NOT LOGIN"
    }
}
const register = async ({ email, password, name }) => {
    try {
        const exisUser = await UserModel.findOne({ email })
        if (!!exisUser) throw new Error("USER EXISTING")
        const newUser = await UserModel.create({ email, password, name })
       
        let accessToken = jwt.sign({ ...newUser._doc, password: 'NOT SHOW' }, process.env.SECRET_KEY)
        return accessToken
    } catch (error) {
        throw 'CAN NOT REGISTER'
    }
}
function executeDenoising(img) {
    return new Promise((resolve, reject) => {
        const pythonScript = 'E:/Web/OnTapNodejs/handleDenoise/test.py';

        exec(`python ${pythonScript} --image "E:/Web/OnTapNodejs/images/${img}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Lỗi: ${error}`);
                reject(error)
                return;
            }
            console.log(`Kết quả: ${stdout}`);
            resolve(stdout)
        });
    });
}
function executeDiagnosis(img) {
    return new Promise((resolve, reject) => {
        const pythonScript = 'E:/Web/OnTapNodejs/handleDiagnoisis/main.py';

        let result = []
        result.push({ img: 'http://localhost:3001/' + img })
        exec(`python ${pythonScript} --image "E:/Web/OnTapNodejs/images/${img}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Lỗi: ${error}`);
                reject(error)
            }
            const outputLines = stdout.trim().split('\n');
            let count = outputLines.length
            for (let i = 2; i < count - 1; i += 2) {
                result.push({
                    name: outputLines[i],
                    ac: outputLines[i + 1]
                })
            }
            resolve(result)

        });
    });
}
const updateUser = async ({ name, image, phone, address, id }) => {
    try {
        let user = await UserModel.findByIdAndUpdate(id, { name, image, phone, address }, { new: true })
        let accessToken = jwt.sign({ ...user._doc, password: 'NOT SHOW' }, process.env.SECRET_KEY)
        return accessToken
    } catch (error) {
        throw "CAN NOT UPDATE"
    }
}
export default {
    login,
    register,
    updateUser,
    executeDenoising,
    executeDiagnosis
}