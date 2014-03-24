var vow = require('vow');
var buildAsset = require('enb/lib/server/server-middleware').createBuilder();
var dataSource = require('./data-source');

/*
* @param {String} pageName Name of page template in /pages folder
* @param {String} path Url for page which was requested by user. For example, `page/2` or `category/life`
* @param {{posts: Posts}} data All posts
* @returns {String} built HTML
* */
function buildPage(pageName, path, data) {
    var root = (path ? (new Array(path.split('/').length + 1)).join('../').replace(/\/$/, '') : '.');
    var assetsPath = root + '/build/build';
    return vow.all([
            requireAsset('build.page'),
            requireAsset('build.bt')
        ]).spread(function (pages, templates) {
            return pages.exec(pageName, {
                root: root,
                assetsPath: assetsPath,
                path: path,
                data: data
            }).then(function (btJson) {
                return templates.apply(btJson);
            });
        });
}

function processPage(pageName, req, res, next) {
    vow.fulfill().then(function() {
        return dataSource.buildData();
    }).then(function (data) {
        // req.path contains string from app.get()
        // replace cuts first slash `/page/2` to `page/2`
        return buildPage(pageName, req.path.replace(/(^\/+)|(\/+$)/g, ''), data).then(function (html) {
            res.end(html);
        });
    }).fail(function (error) {
        next(error);
    });
}

function createPageProcessor(pageName) {
    return function(req, res, next) {
        processPage(pageName, req, res, next);
    }
}

function requireAsset(assetName) {
    var path = 'build/' + assetName + '.js';
    return buildAsset(path).then(function () {
        var absPath = process.cwd() + '/' + path;
        delete require.cache[absPath];
        return require(absPath);
    });
}

module.exports.buildPage = buildPage;
module.exports.processPage = processPage;
module.exports.createPageProcessor = createPageProcessor;
