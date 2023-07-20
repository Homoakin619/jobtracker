const express = require('express');
const router = express.Router();


const {dashboardController, jobController, jobDetailController, jobEditController}  = require('../../controllers/pages/pagesController');

router.get('/dashboard',dashboardController);
router.get('/job',jobController);
router.get('/job/edit/:id',jobEditController);
router.get('/job/:id',jobDetailController);




module.exports = router;