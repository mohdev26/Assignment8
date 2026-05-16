const { getDB } = require('../db/connection');

const { ObjectId } = require('mongodb');


// 1
const createBooksCollection = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.createCollection('books', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['title'],
                    properties: {
                        title: {
                            bsonType: 'string',
                            minLength: 1
                        }
                    }
                }
            }
        });

        res.json({
            ok: 1,
            result
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 2
const createAuthorCollection = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection('authors').insertOne({
            name: 'Author1',
            nationality: 'British'
        });

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 3
const createLogsCollection = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.createCollection('logs', {
            capped: true,
            size: 1024 * 1024
        });

        res.json({
            ok: 1,
            result
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 4
const createTitleIndex = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection('books').createIndex({
            title: 1
        });

        res.json({
            index: result
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 5
const insertOneBook = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection('books').insertOne({
            title: 'Book1',
            author: 'Ali',
            year: 1937,
            genres: ['Fantasy', 'Adventure']
        });

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 6
const insertManyBooks = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection('books').insertMany([
            {
                title: 'Future',
                author: 'George Orwell',
                year: 2020,
                genres: ['Science Fiction']
            },
            {
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                year: 1960,
                genres: ['Classic', 'Fiction']
            },
            {
                title: 'Brave New World',
                author: 'Aldous Huxley',
                year: 2006,
                genres: ['Dystopian', 'Science Fiction']
            },
            {
                title: 'The Hobbit',
                author: 'Tolkien',
                year: 1937,
                genres: ['Fantasy', 'Adventure']
            }
        ]);

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 7
const insertLog = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection('logs').insertOne({
            book_id: new ObjectId(),
            action: 'borrowed'
        });

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 8
const updateBookYear = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection('books').updateOne(
            { title: req.params.title },
            {
                $set: {
                    year: 2022
                }
            }
        );

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 9
const findBookByTitle = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection('books').findOne({
            title: req.query.title
        });

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 10
const findBooksBetweenYears = async (req, res) => {

    try {

        const db = getDB();

        const from = Number(req.query.from);

        const to = Number(req.query.to);

        const result = await db.collection('books')
            .find({
                year: {
                    $gte: from,
                    $lte: to
                }
            })
            .toArray();

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 11
const findBooksByGenre = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection('books')
            .find({
                genres: req.query.genre
            })
            .toArray();

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 12
const skipLimitBooks = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection('books')
            .find()
            .sort({ year: -1 })
            .skip(2)
            .limit(3)
            .toArray();

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 13
const findIntegerYearBooks = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection('books')
            .find({
                year: {
                    $type: 'int'
                }
            })
            .toArray();

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 14
const excludeGenres = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection('books')
            .find({
                genres: {
                    $nin: ['Horror', 'Science Fiction']
                }
            })
            .toArray();

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 15
const deleteBooksBeforeYear = async (req, res) => {

    try {

        const db = getDB();

        const year = Number(req.query.year);

        const result = await db.collection('books').deleteMany({
            year: {
                $lt: year
            }
        });

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 16
const aggregate1 = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection('books')
            .aggregate([
                {
                    $match: {
                        year: {
                            $gt: 2000
                        }
                    }
                },
                {
                    $sort: {
                        year: -1
                    }
                }
            ])
            .toArray();

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 17
const aggregate2 = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection('books')
            .aggregate([
                {
                    $match: {
                        year: {
                            $gt: 2000
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        title: 1,
                        author: 1,
                        year: 1
                    }
                }
            ])
            .toArray();

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 18
const aggregate3 = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection('books')
            .aggregate([
                {
                    $unwind: '$genres'
                },
                {
                    $project: {
                        _id: 0,
                        title: 1,
                        genres: 1
                    }
                }
            ])
            .toArray();

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// 19
const aggregate4 = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection('logs')
            .aggregate([
                {
                    $lookup: {
                        from: 'books',
                        localField: 'book_id',
                        foreignField: '_id',
                        as: 'book_details'
                    }
                }
            ])
            .toArray();

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
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
};