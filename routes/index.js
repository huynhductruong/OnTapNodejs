import userRoute from './user.js'
function route(app)
{
    app.use('/users',userRoute)
    
}
export default route