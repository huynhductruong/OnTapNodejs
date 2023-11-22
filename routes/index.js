import userRoute from './user.js'
import denoisRoute from './denoising.js'
function route(app)
{
    app.use('/users',userRoute)
    app.use('/denoisings',denoisRoute)
}
export default route