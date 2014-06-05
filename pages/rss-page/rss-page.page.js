module.exports = function (pages) {
    pages.declare('rss-page', function (params) {
        var posts = params.data.posts.getPosts();

        // /feed - все посты
        // /category/tech/feed
        // /category/life/feed

        return {
            block: 'layout-for-rss',
            params: params,

            content: posts
        };
    });
};
