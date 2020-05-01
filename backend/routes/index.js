module.exports = (app) => {
    app.use('/api', require('./mainRouter/index'));
};