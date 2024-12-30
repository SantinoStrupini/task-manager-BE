const mongoose = require('mongoose');

const connectionString = `mongodb+srv://dbUser:dbUserPassword@cluster0.udsjs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(connectionString)
    .then(() =>{
        console.log('database connected');
        
    }).catch(err =>{
        console.error(err)
    })


module.exports = mongoose;