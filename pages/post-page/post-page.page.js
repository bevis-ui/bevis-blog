module.exports = function (pages) {
    pages.declare('post-page', function (params) {
        var filePath = decodeURIComponent(params.path);
        var post = params.data.posts.findByPath(filePath);

        if (!post) {
            throw Error('Post not found: ' + filePath);
        }

        return {
            block: 'page-layout',
            pageTitle: post.getTitle(),
            params: params,
            scripts: [
                {url: '//bevisblog.disqus.com/embed.js'}
            ],
            content: [
                {
                    block: 'post',
                    body: post.getHtmlBody(),
                    title: post.getTitle(),
                    root: params.root,
                    date: post.getDate().toLocaleDateString(),
                    readingNow: true,
                    tags: post.getTags()
                },
                { block: 'comments' },
            ]
        };
    });
};
