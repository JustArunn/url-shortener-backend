const mongoose = require('mongoose');

const connect = () =>{
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{console.log('MongoDB connected')})
    .catch((err)=>{
        console.log('Error in MongoDB connection', err);
        process.exit(1);
    })
}

module.exports = connect;