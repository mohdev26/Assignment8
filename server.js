require('dotenv').config();

const app = require('./src/app');

const { connectDB } = require('./src/db/connection');

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {

        app.listen(PORT, () => {
            console.log(`Server Running On Port ${PORT}`);
        });

    })
    .catch((err) => {
        console.log(err);
    });