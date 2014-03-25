module.exports = function (pages) {
    pages.declare('archive-page', function (params) {
        var posts = params.data.posts.getPosts();

        return {
            block: 'page',
            title: 'Все статьи',
            styles: [
                {url: params.assetsPath + '.css'}
            ],
            scripts: [
                {url: params.assetsPath + '.js'}
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
                        { page: 'Презентации', url: params.root + '/presentation' },
                        { page: 'Архив', url: params.root + '/archive' }
                    ]
                },
                {
                    block: 'title',
                    text: 'Архив'
                },
                {
                    block: 'post-list',
                    posts: posts.map(function (post) {
                        return {
                            block: 'post',
                            view: 'archive',
                            title: post.getTitle(),
                            url: params.root + '/' + post.getLink(),
                            date: post.getDate().toLocaleDateString()
                        }
                    })
                },
                { block: 'footer' }
            ]
        };
    });
};
