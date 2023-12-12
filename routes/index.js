import userRoute from './user.js'
import denoisRoute from './denoising.js'
import historiesRoute from './histories.js'
function route(app)
{
    app.use('/users',userRoute)
    app.use('/denoisings',denoisRoute)
    app.use('/histories',historiesRoute)
}
export default route