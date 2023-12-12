import jwt from 'jsonwebtoken'

export default  async (req,res,next)=>
{
    const authorization = req.headers['authorization']

    const token = authorization.split(' ')[1]

    if(token!=null&&token!=undefined)
    {
        try {
            let data = await jwt.verify(token,process.env.SECRET_KEY)
            if(data!=undefined)
            {
                req.user = data
                next()
            }
        } catch (error) {
            next("Token Fails")
        }
    }else  next('Token Fails')
    
}