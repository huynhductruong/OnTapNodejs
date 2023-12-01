import { validationResult } from 'express-validator'
import { userService} from '../services/index.js'
import { exec  } from'child_process'


const login = async (req, res) => {
    try {
        console.log(req.body);
        const err = validationResult(req)
        if (!err.isEmpty()) {
            return res.status(400).json({ errors: err.array() })
        }
        
        let { email, password } = req.body
        let data = await userService.login({ email, password })
        if(!!data)  res.status(200).json(data.name)
        else res.status(404).json({message:"NOT MATCH"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}
const register = async (req, res) => {
    try {
        const { email, password,name } = req.body
       let newUser =  await userService.register({ email, password,name })
        res.status(200).json(newUser._doc.name)
    } catch (error) {
        res.status(500).json(error)
    }
}
const Denoising = async (req, res) => {
    let img = req.imgName
    await userService.executeDenoising(img)
    res.json({img:'http://localhost:3001/'+img})

}
const Diagnosis = async (req, res) => {
    const pythonScript = 'E:/Web/OnTapNodejs/handleDiagnoisis/main.py';
    let img = req.imgName
    let result = await userService.executeDiagnosis(img)
    res.json(result)

}



export default {
    Denoising,
    Diagnosis,

    login,
    register
 
}
