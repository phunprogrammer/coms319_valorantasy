const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

app.use('/users', usersRoute);
app.use('/auth', authRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

mongoose.connect(process.env.MDB_CONNECT)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error(err);
});