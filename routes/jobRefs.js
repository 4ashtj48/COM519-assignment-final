const express = require('express');
const router = express.Router();
var multer  = require('multer')
var upload = multer()
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');
var jobRefController = require('../Controllers/JobRefController');

//every route- is behind /jobs

//JobRefController.createJobRef
router.get('/', ensureAuthenticated, (req, res) =>res.render('createJob'));
router.post('/createJobPost',[ensureAuthenticated, upload.none()], jobRefController.createJobRef);
router.get('/jobList',ensureAuthenticated, jobRefController.jobList);
router.get('/jobDetail/:jobRef',ensureAuthenticated, jobRefController.jobDetails);
router.put('/jobUpdate/:jobRef',[ensureAuthenticated, upload.none()], jobRefController.updateJobRef);
router.delete('/jobDelete/:jobID',ensureAuthenticated, jobRefController.deleteJobRef);    



 module.exports = router;
 

 
 