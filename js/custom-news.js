//news api



var newsRequest,
    newsKey = '8f3a55cf94e04b7ca84c924294b013a7';
//for older broswser
if (window.XMLHttpRequest) {
    newsRequest = new XMLHttpRequest();
} else {
    newsRequest = new ActiveXObject("Microsoft.XMLHTTP");
} //window.XMLHttpRequest    

newsRequest.open("GET", 'https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=' + newsKey);
newsRequest.onreadystatechange = function () {
    if ((newsRequest.readyState === 4) && (newsRequest.status === 200)) {
        var infoNews = JSON.parse(newsRequest.responseText);
        // Action to be performed when the document is read;

        var newsHtml = '<ul class="list-group">';
        for (var i = 0; i < infoNews.articles.length; i++) {
            newsHtml += '<li>';
            newsHtml += '<figure>';
            newsHtml += '<a href="' + infoNews.articles[i].url + '" target="_blank">';
            newsHtml += '<img src = "' + infoNews.articles[i].urlToImage + '"  alt="' + infoNews.articles[i].title + '" title="' + infoNews.articles[i].title + '">';
            newsHtml += '</a>';
            newsHtml += '<figcaption>' + infoNews.articles[i].title + '<figcaption>';
            newsHtml += '<figcaption>' + infoNews.articles[i].description + '<figcaption>';
            newsHtml += '<figcaption>' + 'by' + ' ' + infoNews.articles[i].author + '<figcaption>';
            newsHtml += '</figure>';
            newsHtml += '</li>';
        } //for loops json
        newsHtml += '</ul>';
        document.querySelector('.newsParent').innerHTML = newsHtml;
    } //newsRequest.readyState
} //newsRequest.readyState
//xmlhtpprequest method open                   
newsRequest.send();
