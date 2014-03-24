module.exports = function (bt) {

    bt.match('menu', function (ctx) {
        ctx.setTag('ul');
        ctx.setContent(ctx.getParam('links').map(function (link) {
            return {
                elem: 'item',
                link: link
            }
        }));
    });

    bt.match('menu__item', function (ctx) {
        ctx.setTag('li');
        ctx.setContent({
            elem: 'link',
            text: ctx.getParam('link').page,
            url: ctx.getParam('link').url
        });
    });

    bt.match('menu__link', function (ctx) {
        ctx.setTag('a');
        ctx.setAttr('href', ctx.getParam('url'));
        ctx.setContent(ctx.getParam('text'));
    });

};
