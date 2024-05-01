const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.json());

mongoose.connect(process.env.MDB_CONNECT)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error(err);
});

app.use('/users', require('./routes/userRoutes'));
app.use('/auth', require('./routes/authRoutes'));