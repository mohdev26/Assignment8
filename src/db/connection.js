const { MongoClient } = require('mongodb');

require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URL);

let dbConnection;

const connectDB = async () => {

    await client.connect();

    console.log('MongoDB Connected');

    dbConnection = client.db(process.env.DB_NAME);

};

const getDB = () => dbConnection;

module.exports = {
    connectDB,
    getDB
};