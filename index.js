require('dotenv').config();
const express = require('express');
const connect = require('./config/database');
const userRouter = require('./routes/user');
const urlRouter = require('./routes/url');
const staticRouter = require('./routes/static');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4001


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//EJS Settings
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//routes
app.use('/user',userRouter);
app.use('/url',urlRouter);
app.use('/',staticRouter);

//start server
app.listen(PORT, ()=>{console.log(`Server listening on PORT ${PORT}`)});
connect();