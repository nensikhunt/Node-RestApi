const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./database.config.js');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to My API." });
});

require('./app/routes/api.routes.js')(app);

app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});
