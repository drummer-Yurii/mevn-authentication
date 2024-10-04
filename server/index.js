require('dotenv').config;
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const corsOptions = require('./config/cors');
const connectDB = require('./config/database');
const credentials = require('./middleware/credentials');
const errorHandlerMiddleware = require('./middleware/error_handler');

const app = express();
const PORT = 3000;
connectDB();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(errorHandlerMiddleware);


app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
