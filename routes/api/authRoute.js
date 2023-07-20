
const express = require('express');
const router = express.Router();

const {loginController, registerController} = require('../../controllers/api/authController');


router.post('/login',loginController);
router.post('/register',registerController);
router.get('/logout',(req,res) => {
    req.session.destroy();
    return res.redirect('/login')
})

module.exports = router;