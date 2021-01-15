const express = require('express');
const router = express.Router();
var multer  = require('multer')
var upload = multer()
const { forwardAuthenticated,ensureAuthenticated } = require('../config/auth');
var POController = require('../Controllers/POController');


router.get('/', ensureAuthenticated, POController.createPOPage)
router.post('/createPOPost', [ensureAuthenticated, upload.none()],POController.createPO);
router.get('/poList',ensureAuthenticated, POController.poList);
router.get('/poDetail/:poNumber',ensureAuthenticated, POController.poDetail);
router.put('/updatePO/:poNumber',[ensureAuthenticated, upload.none()], POController.updatePO);

//poID?
router.delete('/deletePO/:poID',ensureAuthenticated, POController.deletePO);    



//controller for CRUD functions

module.exports = router;
