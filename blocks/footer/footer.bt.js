module.exports = function (bt) {

    bt.match('footer', function (ctx) {
        ctx.setContent('Powered by <a href="http://github.com/bevis-ui">BEViS</a>');
    });

};
