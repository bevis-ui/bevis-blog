var path = require('path');
var vow = require('vow');
var vowFs = require('vow-fs');
var pages = require('./pages');
var dataSource = require('./data-source');

var PAGELENGTH = 10;

vow.all([
    dataSource.buildData(),
    pages.requireAsset('build.page'),
    pages.requireAsset('build.bt')
]).spread(function (data, pagesJs, templates) {

    /**
     * Генерирует страницу и сохраняет по переданному пути.
     *
     * @param {String} pageName
     * @param {String} [requestPath='']
     * @returns {Promise}
     */
    function generatePage(pageName, requestPath) {
        requestPath = requestPath || '';
        var filename = 'static/' + (requestPath ? requestPath + '/' : '') + 'index.html';
        return vowFs.makeDir(path.dirname(filename)).then(function () {
            return pages.buildPageUsingAssets(pageName, requestPath, data, pagesJs, templates).then(function (html) {
                return vowFs.write(filename, html).then(function () {
                    console.log('Generated ' + filename);
                });
            });
        });
    }

    var indexPages = pageCountToPageArray(data.posts.getPageCount(PAGELENGTH));

    return vow.all([
        generatePage('index-page'),
        generatePage('archive-page', 'archive'),
        vow.all(indexPages.map(function (pageNumber) {
            return generatePage('index-page', 'page/' + pageNumber);
        })),
        vow.all(data.posts.getPosts().map(function (post) {
            return generatePage('post-page', post.getPath());
        })),
        vow.all(data.posts.getCategories().map(function (categoryName) {
            var categoryFilter = function (post) { return post.getCategories().indexOf(categoryName) !== -1; };
            var pages = pageCountToPageArray(data.posts.getPageCount(PAGELENGTH, categoryFilter));
            return vow.all([
                generatePage('index-page', 'category/' + categoryName),
                vow.all(pages.map(function (pageNumber) {
                    return generatePage('index-page', 'category/' + categoryName + '/page/' + pageNumber);
                }))
            ]);
        })),
        vow.all(data.posts.getTags().map(function (tagName) {
            var tagFilter = function (post) { return post.getTags().indexOf(tagName) !== -1; };
            var pages = pageCountToPageArray(data.posts.getPageCount(PAGELENGTH, tagFilter));
            return vow.all([
                generatePage('index-page', 'tag/' + tagName),
                vow.all(pages.map(function (pageNumber) {
                    return generatePage('index-page', 'tag/' + tagName + '/page/' + pageNumber);
                }))
            ]);
        }))
    ]);
}).done();

function pageCountToPageArray(pageCount) {
    var pages = [];
    for (var i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }
    return pages;
}
