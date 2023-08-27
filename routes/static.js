const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    return res.render('signup');
})

router.get('/login', (req, res)=>{
    return res.render('login');
})

router.get('/dashboard', (req, res)=>{
    return res.render('home');
})

router.get('/createUrl', (req, res)=>{
    return res.render('createUrl');
})

module.exports = router;