module.exports = function (bt) {

    bt.match('post-list', function (ctx) {
        ctx.setContent(ctx.getParam('posts').map(function (post) {
            return {elem: 'item', post: post};
        }));
    });

    bt.match('post-list__item', function (ctx) {
        ctx.setContent(ctx.getParam('post'));
    });
};
