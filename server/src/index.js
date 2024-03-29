const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;

const db = require('./config/db');
const route = require('./routes');
dotenv.config();
// Connect to DB
db.connect();

app.use(morgan('combined'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
