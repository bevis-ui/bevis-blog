/**
 * bemdecl
 * ==
 *
 * Строит *bemdecl*-файл на основе набора страниц.
 *
 * **Опции**
 *
 * * *String* **target** — Результирующий таргет. По умолчанию — `?.js`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('./techs/bemdecl'));
 * ```
 */

var fs = require('fs');
var dropRequireCache = require('enb/lib/fs/drop-require-cache');

module.exports = require('enb/lib/build-flow').create()
    .name('bemdecl')
    .target('target', '?.bemdecl.js')
    .defineRequiredOption('pagesDir')
    .needRebuild(function () {
        this._bemdeclData = {
            blocks: fs.readdirSync(this._pagesDir).map(function (pageName) {
                return {
                    name: pageName
                };
            })
        };

        var filePath = this.node.resolvePath(this._target);
        if (fs.existsSync(filePath)) {
            dropRequireCache(require, filePath);
            var previousData = require(filePath);
            return JSON.stringify(this._bemdeclData) !== JSON.stringify(previousData);
        }

        return true;
    })
    .builder(function () {
        return 'module.exports.blocks = ' + JSON.stringify(this._bemdeclData.blocks, null, 4) + ';';
    })
    .createTech();
