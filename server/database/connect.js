const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URL;

const connectDB = async () => {
    mongoose.connect(mongoURL,
        async (err) => {
            if (err) throw err;
            console.log('Connected with mongoDB');
        })
};

module.exports = connectDB;