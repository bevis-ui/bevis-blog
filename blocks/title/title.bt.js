module.exports = function (bt) {

    bt.match('title', function (ctx) {
        ctx.setTag('div');

        ctx.setContent(ctx.getParam('text'));
    });

};
