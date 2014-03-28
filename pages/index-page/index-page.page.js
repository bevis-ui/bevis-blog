module.exports = function (pages) {
    pages.declare('index-page', function (params) {
        // Количество статей на одной странице
        var PAGELENGTH = 10;

        var requestPath = params.path;
        var allPosts = params.data.posts;

        // Раскладываем запрошенный урл на фрагменты
        var requestPathBits = requestPath.split('/');

        // Номер текущей страницы
        var pageNumber = 1;

        // Фильтр для категории или тега
        var postFilter = null;
        // Имя запрошенной категории
        var categoryName = null;
        // Имя запрошенного тега
        var tagName = null;
        //  Заголовок страницы
        var titlePage = null;

        var pagerPrefix = params.root + '/';
        var pathBit;
        while (pathBit = requestPathBits.shift()) {
            switch (pathBit) {
                case 'category':
                    categoryName = decodeURIComponent(requestPathBits.shift());
                    postFilter = function (post) { return post.getCategories() && post.getCategories().indexOf(categoryName) !== -1; }
                    pagerPrefix =  [params.root, '/', pathBit, '/', decodeURIComponent(categoryName), '/'].join('');
                    titlePage = "Категория статей: " + categoryName;
                    break;

                case 'tag':
                    tagName = decodeURIComponent(requestPathBits.shift());
                    postFilter = function (post) { return post.getTags() && post.getTags().indexOf(tagName) !== -1; }
                    pagerPrefix =  [params.root, '/', pathBit, '/', categoryName, '/'].join('');
                    titlePage = "Тема статей: " + tagName;
                    break;

                case 'page':
                    pageNumber = parseInt(requestPathBits.shift()) || 1;
                    break;
            }
        }

        // Посты для текущей страницы
        var posts = allPosts.selectPostsForPage(pageNumber, PAGELENGTH, postFilter);

        // Количество страниц с учётом PAGELENGTH и фильтрации по тегам/категориям
        var pageCount = allPosts.getPageCount(PAGELENGTH, postFilter);

        // Номера для предыдущей и следующей старницы
        // null чтобы для этих случаев не генерились кнопки
        var nextPageNumber = pageNumber < pageCount ? pageNumber + 1 : null;
        var prevPageNumber = pageNumber > 1 ? pageNumber - 1 : null;

        return {
            block: 'page-layout',
            pageTitle: 'Markdown блог',
            params: params,
            content: [
                {
                    block: 'post-list',
                    posts: posts.map(function (post) {
                        return {
                            block: 'post',
                            title: post.getTitle(),
                            url: post.getLink(),
                            root: params.root,
                            body: post.getShortHtmlBody(),
                            date: post.getDate().toLocaleDateString(),
                            hasMoreButton: post.hasShortBody(),
                            tags: post.getTags()
                        }
                    })
                },
                {
                    block: 'pager',
                    nextPage: nextPageNumber,
                    prevPage: prevPageNumber,
                    currPage: pageNumber,
                    pathPrefix: pagerPrefix
                }
            ]
        };
    });
};
