//server file and logic
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();


//create express server
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//gets the url from atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//require the files and using the files
const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);




//starts the server
app.listen(port, () => {
    console.log(`Server up and running on port: ${ port }`);
});