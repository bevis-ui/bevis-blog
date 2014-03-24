var express = require('express');
var app = express();
var createPageProcessor = require('./pages').createPageProcessor;

app
    .use('/blocks', express.static(__dirname + '/../blocks'))
    .use('/images', express.static(__dirname + '/../images'))
    .use(require('enb/lib/server/server-middleware').createMiddleware())
    .use(app.router)
    .use(function (req, res) {
        res.statusCode = 404;
        res.end('Not found');
    });

/**
 * Routing
 */
app
    .get('/', createPageProcessor('index-page'))
    .get('/page/:page', createPageProcessor('index-page'))

    .get('/category/:categoryName', createPageProcessor('index-page'))
    .get('/category/:categoryName/page/:page', createPageProcessor('index-page'))

    .get('/tag/:tagName', createPageProcessor('index-page'))
    .get('/tag/:tagName/page/:page', createPageProcessor('index-page'))

    .get('/presentation', createPageProcessor('index-page'))
    .get('/presentation/page/:page', createPageProcessor('index-page'))

    .get('/archive', createPageProcessor('archive-page'))

    .get('/:year/:month/:day/:post', createPageProcessor('post-page'));

var port = 8080;
app
    .listen(port, function () {
        console.error('app started on %s', port);
    })
    .once('error', function (err) {
        console.error('worker %s has failed to start application', process.pid);
        if (err.code === 'EADDRINUSE') {
            console.error('port %s is taken', port);
            process.kill();
        } else {
            console.error(err.stack);
        }
    });
