var Posts = require('./posts');

var POSTS_DIR = process.cwd() + '/posts';

module.exports = {
    /**
     * @returns {Promise}
     */
    buildData: function () {
        return Posts.loadPosts(POSTS_DIR).then(function (posts) {
            return {
                posts: posts
            };
        });
    }
};
