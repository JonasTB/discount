const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

// connect db
const connectDB = require('./src/database/db');

// default admin user
const Seeds = require('./src/util/seeds');
Seeds.defaultAdmin();

// variables environment
require('dotenv').config;
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 3000


const app = express();
connectDB();

app.use(cors());
app.options('*', cors());

app.use(morgan('dev'));

app.use(express.json({ limit: 1000000 }));
app.use(express.urlencoded({ limit: 1000000, extended: true }));

app.all('*', require('./src/routes/index'));

app.get('/', (req, res) => {
    return res.send('OK!');
});

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });