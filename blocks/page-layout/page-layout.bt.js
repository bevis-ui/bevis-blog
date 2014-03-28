module.exports = function (bt) {

    /**
     * Блок для задания общего лайаута всех страниц.
     *
     * @param {String} block Имя блока. Всегда `page-layout`
     * @param {String} pageTitle Заголовок страницы
     * @param {Object} params Параметры страницы
     * @param {Array} styles Дополнительные стили, специфичные для какой-то страницы
     * @param {Array} scripts Дополнительные скрипты, специфичные для какой-то страницы
     * @param {BTJson} content Содержимое страницы в btjson-формате
     */

    bt.match('page-layout', function (ctx) {

        var pageTitle = ctx.getParam('pageTitle');
        var params = ctx.getParam('params');

        var pageStyles = [
            {url: params.assetsPath + '.css'},
            {url: 'http://yandex.st/highlightjs/8.0/styles/github.min.css'}
        ];

        var styles = ctx.getParam('styles');
        if (styles) {
            pageStyles = pageStyles.concat(styles);
        }

        var pageScripts = [
            {url: params.assetsPath + '.js'},
            {url: 'http://yandex.st/highlightjs/8.0/highlight.min.js'},
            {source: 'hljs.initHighlightingOnLoad();'}
        ];

        var scripts = ctx.getParam('scripts');
        if (scripts) {
            pageScripts = pageScripts.concat(scripts);
        }

        return {
            block: 'page',
            title: pageTitle,
            styles: pageStyles,
            scripts: pageScripts,
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

                ctx.getParam('content'),

                { block: 'footer' }
            ]
        };
    });

};
