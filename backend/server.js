const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    routes = require('./routes/index'),
    app = express();

require('dotenv').config();

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: process.env.CLIENT_URL }));
}
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected');
});

require('./routes')(app);
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Listening on port ', port);
})
