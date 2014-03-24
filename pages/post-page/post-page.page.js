module.exports = function (pages) {
    pages.declare('post-page', function (params) {
        var filePath = decodeURIComponent(params.path);
        var post = params.data.posts.findByPath(filePath);

        if (!post) {
            throw Error('Post not found: ' + filePath);
        }

        return {
            block: 'page',
            title: post.getTitle(),
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
                        { page: 'Главная', url: '/' },
                        { page: 'Презентации', url: '/presentation' },
                        { page: 'Архив', url: '/archive' }
                    ]
                },
                {
                    block: 'post',
                    body: post.getHtmlBody(),
                    title: post.getTitle(),
                    date: post.getDate().toLocaleDateString(),
                    readingNow: true,
                    categories: post.getCategories(),
                    tags: post.getTags()
                },
                { block: 'comments' },
                { block: 'footer' }
            ]
        };
    });
};
