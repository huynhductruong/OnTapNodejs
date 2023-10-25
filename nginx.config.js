export default {
    apps: [
        {
            name: 'test',
            script: 'index.js',
            env: {
                PORT: 3000,
                MONGO_URI: "mongodb+srv://khungking909:khungking123@cluster0.ea7mlon.mongodb.net/Nodejs_MongoDB",
                SECRET_KEY: '10012002'
            }
        }
    ]
}