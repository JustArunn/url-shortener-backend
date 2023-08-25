const express = require('express');
const router = express.Router();
const {signup, login,me} = require('../controllers/user');
const {auth} = require('../middlewares/auth');

//public routes
router.post('/signup',signup);
router.post('/login', login);

//protected routes
router.get('/me',auth, me);
module.exports = router;