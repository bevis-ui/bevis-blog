module.exports = function (bt) {

    bt.match('pager', function (ctx) {

        ctx.setContent([
            ctx.getParam('nextPage') && {
                elem: 'link',
                number: ctx.getParam('nextPage'),
                text: '← Назад в прошлое',
                prefix: ctx.getParam('pathPrefix')
            },
            ctx.getParam('prevPage') && {
                elem: 'link',
                number: ctx.getParam('prevPage'),
                text: 'Вперёд в настоящее →',
                prefix: ctx.getParam('pathPrefix')
            }
        ]);
    });

    bt.match('pager__link', function (ctx) {

        var prefix = ctx.getParam('prefix');
        var pageNumber = ctx.getParam('number');
        var pagePath = prefix + 'page/' + pageNumber;

        var href = pageNumber === 1 ? prefix : pagePath;

        ctx.setTag('a');
        ctx.setAttr('href', href);
        ctx.setContent(ctx.getParam('text'));
    });

};
