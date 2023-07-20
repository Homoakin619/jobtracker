
const express = require('express');
const router = express.Router();

const {loginPageController} = require('../../controllers/pages/authController');

router.get('/login',loginPageController);
// router.get('/register',loginPageController);

module.exports = router;