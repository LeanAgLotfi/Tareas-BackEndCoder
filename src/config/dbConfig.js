const mongoose = require('mongoose')
const options = require('./options')


mongoose.set('strictQuery', false)
mongoose.connect(options.mongoDB.url, (error) => {
    if(error){
        return console.log(`conenction fail: ${error}`)
    }
    console.log('conectado a db: data base');
})