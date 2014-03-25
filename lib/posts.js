var vowFs = require('vow-fs');
var vow = require('vow');
var Post = require('./post');

function Posts(postsArray) {
    this._posts = postsArray;
    this._posts.sort(function (postA, postB) {
        return postA.getDate().getTime() < postB.getDate().getTime() ? 1 : -1;
    });
}

Posts.prototype = {
    findByPath: function (path) {
        return this._posts.filter(function (post) {
            return post.getPath() === path;
        })[0];
    },
    selectPostsForPage: function (page, pageLength, filter) {
        // отфильтровать
        var posts = filter ? this._posts.filter(filter) : this._posts;

        // вырезать нужное количество статей
        page--;
        return posts.slice(page * pageLength, (page + 1) * pageLength);
    },
    getPageCount: function (pageLength, filter) {
        var posts = filter ? this._posts.filter(filter) : this._posts;

        return Math.ceil(posts.length / pageLength);
    },

    /**
     * Returns all posts
     * @return {Array}
     */
    getPosts: function () {
        return this._posts;
    },

    /**
     * @returns {String[]}
     */
    getCategories: function () {
        return Object.keys(this._posts.reduce(function (obj, post) {
            post.getCategories().forEach(function (categoryName) {
                obj[categoryName] = true;
            });
            return obj;
        }, {}));
    },

    /**
     * @returns {String[]}
     */
    getTags: function () {
        return Object.keys(this._posts.reduce(function (obj, post) {
            post.getTags().forEach(function (tagName) {
                obj[tagName] = true;
            });
            return obj;
        }, {}));
    }
};

Posts.loadPosts = function (directoryPath) {
    return vowFs.listDir(directoryPath).then(function (filenames) {
        return vow.all(
                filenames
                    .map(function (filename) {
                        return directoryPath + '/' + filename;
                    })
                    .map(function (filePath) {
                        return Post.parseFile(filePath);
                    })
            )
            .then(function (postsArray) {
                return new Posts(postsArray);
            });
    });
};

module.exports = Posts;
