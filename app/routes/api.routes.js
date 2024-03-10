module.exports = (app) => {
    const apis = require('../controllers/apis.controller.js');

    app.post('/api', apis.create);
    app.get('/api', apis.findAll);
    app.get('/api/:ApiId', apis.findOne);
    app.put('/api/:ApiId', apis.update);
    app.delete('/api/:ApiId', apis.delete);
}