import { validationResult } from 'express-validator'
import { userService, imgService} from '../services/index.js'
import { exec  } from'child_process'


const login = async (req, res) => {
    try {
        
        const err = validationResult(req)
        if (!err.isEmpty()) {
            return res.status(400).json({ errors: err.array() })
        }
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
const Denoising = async (req, res) => {
    const pythonScript = 'E:/Web/OnTapNodejs/handleDenoise/test.py';
    let img = req.imgName
    exec(`python ${pythonScript} --image "E:/Web/OnTapNodejs/images/${img}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Lỗi: ${error}`);
          return;
        }
        console.log(`Kết quả: ${stdout}`);
      });
    setTimeout(()=> res.json({img:'http://localhost:3001/'+img}),20000)

}
const Diagnosis = async (req, res) => {
    const pythonScript = 'E:/Web/OnTapNodejs/handleDiagnoisis/main.py';
    let img = req.imgName
    let result = []
    result.push({img:'http://localhost:3001/'+img})
    exec(`python ${pythonScript} --image "E:/Web/OnTapNodejs/images/${img}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Lỗi: ${error}`);
          return;
        }
        const outputLines = stdout.trim().split('\n');
        let count = outputLines.length
        for(let i =2;i<count-1;i+=2)
        {
            result.push({
                name:outputLines[i],
                ac:outputLines[i+1]
            })
        }
        
      });
    setTimeout(()=> res.json(result),20000)

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
    Denoising,
    Diagnosis,
    getUserByID,
    addUser,
    login,
    register,
    updateUser,
    deleteUser,
    getUserByPage
}
