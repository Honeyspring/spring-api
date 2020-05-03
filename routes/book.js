/*The order of middleware is important!  If we were to place  multer  
before the authentication middleware, even unauthenticated
 requests with images would have their images saved to the server.  
 Make sure you place  multer  after  auth!*/
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const bookCtrl = require('../controllers/book');

router.get('/', auth, bookCtrl.getAllBook);
router.post('/',auth,multer,  bookCtrl.createBook);
router.get('/:id',auth,  bookCtrl.getOneBook);
router.put('/:id',auth,multer, bookCtrl.modifyBook);
router.delete('/:id',auth,  bookCtrl.deleteBook);

module.exports = router;
