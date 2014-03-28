module.exports = function (bt) {

    bt.match('page-layout', function (ctx) {

        var pageTitle = ctx.getParam('pageTitle');
        var contentJson = ctx.getParam('content');
        var params = ctx.getParam('params');

        return {
            block: 'page',
            title: pageTitle,
            styles: [
                {url: params.assetsPath + '.css'},
                {url: 'http://yandex.st/highlightjs/8.0/styles/github.min.css'}
            ],
            scripts: [
                {url: params.assetsPath + '.js'},
                {url: '//bevisblog.disqus.com/embed.js'},
                {url: 'http://yandex.st/highlightjs/8.0/highlight.min.js'},
                {source: 'hljs.initHighlightingOnLoad();'}
            ],
            body: [
                {
                    block: 'header',
                    title: 'Markdown блог',
                    titleUrl: params.root,
                    slogan: 'Как Octopress, только на BEViS :)'
                },
                {
                    block: 'menu',
                    links: [
                        { page: 'Главная', url: params.root + '/' },
                        { page: 'Презентации', url: params.root + '/category/presentation/' },
                        { page: 'Архив', url: params.root + '/archive/' }
                    ]
                },
                {
                    block: 'title',
                    text: pageTitle
                },

                contentJson,

                { block: 'footer' }
            ]
        };
    });

};
