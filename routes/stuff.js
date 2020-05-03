/*The order of middleware is important!  If we were to place  multer  
before the authentication middleware, even unauthenticated
 requests with images would have their images saved to the server.  
 Make sure you place  multer  after  auth!*/
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const stuffCtrl = require('../controllers/stuff');

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/',auth,multer,  stuffCtrl.createThing);
router.get('/:id',auth,  stuffCtrl.getOneThing);
router.put('/:id',auth,multer, stuffCtrl.modifyThing);
router.delete('/:id',auth,  stuffCtrl.deleteThing);

module.exports = router;
