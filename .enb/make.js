module.exports = function (config) {
    config.node('build', function (nodeConfig) {
        nodeConfig.addTechs([
            [require('enb/techs/levels'), {levels: getLevels()}],
            [require('./techs/bemdecl'), {pagesDir: config.resolvePath('pages')}],
            require('enb-modules/techs/deps-with-modules'),
            require('enb/techs/files'),
            require('enb-stylus/techs/css-stylus-with-autoprefixer'),
            require('enb-bt/techs/bt-server'),
            [require('enb/techs/js'), {target: '?.pre.js'}],
            [require('enb-modules/techs/prepend-modules'), {source : '?.pre.js', target: '?.js'}],
            require('./techs/page')
        ]);
        nodeConfig.addTargets(["?.min.js", "?.min.css", "?.page.js", "?.bt.js"]);

        nodeConfig.mode('development', function(nodeConfig) {
            nodeConfig.addTechs([
                [require('enb/techs/file-copy'), {sourceTarget: '?.js', destTarget: '?.min.js'}],
                [require('enb/techs/file-copy'), {sourceTarget: '?.css', destTarget: '?.min.css'}]
           ]);
        });

        nodeConfig.mode('production', function(nodeConfig) {
            nodeConfig.addTechs([
                [require('enb/techs/borschik'), {sourceTarget: '?.js', destTarget: '?.min.js'}],
                [require('enb/techs/borschik'), {sourceTarget: '?.css', destTarget: '?.min.css'}]
           ]);
        });
    });

    function getLevels() {
        return [
            'core',
            'blocks',
            'pages'
        ].map(config.resolvePath.bind(config));
    }
};
