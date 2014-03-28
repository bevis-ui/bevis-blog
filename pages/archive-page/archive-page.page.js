module.exports = function (pages) {
    pages.declare('archive-page', function (params) {
        var posts = params.data.posts.getPosts();

        return {
            block: 'page-layout',
            pageTitle: 'Архив',
            params: params,
            content: {
                block: 'post-list',
                posts: posts.map(function (post) {
                    return {
                        block: 'post',
                        view: 'archive',
                        title: post.getTitle(),
                        url: post.getLink(),
                        root: params.root,
                        date: post.getDate().toLocaleDateString()
                    }
                })
            }
        };
    });
};
