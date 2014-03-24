module.exports = function (markdown) {
    var slideshare = '<iframe src="http://www.slideshare.net/slideshow/embed_code/$1" width="597" height="486" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen></iframe>';
    return markdown.replace(/{%\s*slideshare\s+(.*?)\s+%}/gim, slideshare);
};
