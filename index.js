const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorhandler = require('./controllers/error.controller');
const routes = require('./routes/index');

const app = express();
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://day-creations-ecommerce-admin.vercel.app/',
    ],
    optionSuccessStatus: 200,
    credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}
app.use('/api/v1', routes);
app.get('/', (req, res) => {
    res.send('Day Creations Backend server is live');
});
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorhandler);

module.exports = app;
