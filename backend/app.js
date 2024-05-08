const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { scrapeStats } = require('./services/scraperService');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use(cookieParser());

var corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MDB_CONNECT)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error(err);
});

app.use('/leagues', require('./routes/leagueRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/users', require('./routes/userRoutes'));