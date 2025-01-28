const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.mongo_url;

if (!url) {
    console.error("MongoDB connection string is missing in environment variables.");
    process.exit(1);
}

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(error => {
        console.log("Connection failed!", error);
        process.exit(1);
    });