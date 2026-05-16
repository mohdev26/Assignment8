const express = require('express');

const router = express.Router();

const {
    createBooksCollection,
    createAuthorCollection,
    createLogsCollection,
    createTitleIndex,
    insertOneBook,
    insertManyBooks,
    insertLog,
    updateBookYear,
    findBookByTitle,
    findBooksBetweenYears,
    findBooksByGenre,
    skipLimitBooks,
    findIntegerYearBooks,
    excludeGenres,
    deleteBooksBeforeYear,
    aggregate1,
    aggregate2,
    aggregate3,
    aggregate4
} = require('../controllers/books.controller');

router.post('/collection/books', createBooksCollection);

router.post('/collection/authors', createAuthorCollection);

router.post('/collection/logs/capped', createLogsCollection);

router.post('/collection/books/index', createTitleIndex);

router.post('/books', insertOneBook);

router.post('/books/batch', insertManyBooks);

router.post('/logs', insertLog);

router.patch('/books/:title', updateBookYear);

router.get('/books/title', findBookByTitle);

router.get('/books/year', findBooksBetweenYears);

router.get('/books/genre', findBooksByGenre);

router.get('/books/skip-limit', skipLimitBooks);

router.get('/books/year-integer', findIntegerYearBooks);

router.get('/books/exclude-genres', excludeGenres);

router.delete('/books/before-year', deleteBooksBeforeYear);

router.get('/books/aggregate1', aggregate1);

router.get('/books/aggregate2', aggregate2);

router.get('/books/aggregate3', aggregate3);

router.get('/books/aggregate4', aggregate4);

module.exports = router;