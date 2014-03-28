module.exports = function (bt) {

    /**
     * Блок для задания общего лайаута всех web-страниц.
     *
     * @param {String} block Имя блока. Всегда `page-layout`
     * @param {String} pageTitle Заголовок страницы
     * @param {Object} params Параметры страницы
     * @param {Array} styles Дополнительные стили, специфичные для какой-то страницы
     * @param {Array} scripts Дополнительные скрипты, специфичные для какой-то страницы
     * @param {BTJson} content Содержимое страницы в btjson-формате
     */

    bt.match('layout-for-rss', function (ctx) {

        return {}
    });

};
