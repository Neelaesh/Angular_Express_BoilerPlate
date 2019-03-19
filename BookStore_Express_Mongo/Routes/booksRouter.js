var express = require('express');
var booksController = require('../Controllers/booksController');

var router = express.Router();

router.get('/fetchBooks', booksController.getBooks);
router.get('/fetchGenres', booksController.getGenres);
router.get('/fetchFormats', booksController.getFormats);
router.get('/fetchLastBook', booksController.getLastBook);
router.post('/saveBook', booksController.saveBook);
router.get('/viewBook/:id', booksController.viewBook);
router.post('/updateBook', booksController.updateBook);
router.post('/deleteBook', booksController.deleteBook);

module.exports = router;