module.exports = function (markdown) {
    var youtube = '<iframe width="800" height="600" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen=""></iframe>';
    return markdown.replace(/{%\s*youtube\s+(.*?)\s+%}/gim, youtube);
};
