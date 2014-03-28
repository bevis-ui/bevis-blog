module.exports = function (pages) {
    pages.declare('rss-page', function (params) {
        var posts = params.data.posts.getPosts();

        return {
            block: 'layout-for-rss',
            pageTitle: '???',
            params: params,
            content: {}
        };
    });
};
