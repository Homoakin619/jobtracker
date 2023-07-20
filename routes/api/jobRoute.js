
const express = require('express');
const router = express.Router();

const { createJobController, deleteJobController, editJobController } = require('../../controllers/api/jobController');


router.post('/job',createJobController);
router.delete('/job/:id',deleteJobController);
router.patch('/job/edit/:id',editJobController);



module.exports = router;