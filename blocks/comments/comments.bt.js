module.exports = function (bt) {

    bt.match('comments', function (ctx) {
        ctx.setAttr('id', 'disqus_thread');
    });

};
