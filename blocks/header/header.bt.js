module.exports = function (bt) {

    bt.match('header', function (ctx) {
        ctx.setContent([
            {
                elem: 'title',
                url: ctx.getParam('titleUrl'),
                text: ctx.getParam('title')
            },
            {
                elem: 'slogan',
                text: ctx.getParam('slogan')
            }
        ]);
    });

    bt.match('header__title', function (ctx) {
        ctx.setTag('h1');
        ctx.setContent({
            elem: 'title-link',
            url: ctx.getParam('url'),
            text: ctx.getParam('text')
        });
    });

    bt.match('header__title-link', function (ctx) {
        ctx.setTag('a');
        ctx.setAttr('href', ctx.getParam('url'));
        ctx.setContent(ctx.getParam('text'));
    });


    bt.match('header__slogan', function (ctx) {
        ctx.setTag('h2');
        ctx.setContent(ctx.getParam('text'));
    });

};
