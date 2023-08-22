require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { errorHandler } = require('./middlewares/errorHandler');
const router = require('./routes/router');

const app = express();

mongoose.connect(process.env.DATA_BASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(helmet());
app.use(router);
app.use(errors()); // обработка ошибок celebrate
app.use(errorHandler); // центтрализованная обработка ошибок

app.listen(process.env.PORT);
