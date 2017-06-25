/*
quotesModule
*/

var request = require('request');

var mashapeKey = "";

module.exports = {
  getQuoteJSON: function(req, callback, requestURL) {
        request.get(requestURL, function(error, response, body) {
                var responseBody = JSON.parse(body);
                callback(responseBody);
        });
  },
  postQuoteJSON: function(req, callback, requestURL) {
        request.post(requestURL, function(error, response, body) {
                var responseBody = JSON.parse(body);
                callback(responseBody);
        });
  },
  postQuoteJSONWithHeaders: function(req, callback, requestURL, headers) {
        request.post({url: requestURL, headers: headers}, function(error, response, body) {
                var responseBody = JSON.parse(body);
                callback(responseBody);
        });
  },
  getAndruxNetQuoteJSON: function(req, callback) {
        //https://andruxnet-random-famous-quotes.p.mashape.com//?cat=famous
        /*
        {"quote":"Blessed is the man, who having nothing to say, abstains from giving wordy evidence of the fact.",
        "author":"George Eliot",
        "category":"Famous"}
        */

        headers = {
            "X-Mashape-Key": mashapeKey,
            "Accept": "application/json"
        };
        this.postQuoteJSONWithHeaders(req, callback, "https://andruxnet-random-famous-quotes.p.mashape.com//?cat=famous", headers);
  },
  getForismaticQuoteJSON: function(req, callback) {
        //http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en
        /*
        {"quoteText":"The purpose of learning is growth, and our minds, unlike our bodies, can continue growing as we continue to live. ",
        "quoteAuthor":"Mortimer Adler",
        "senderName":"",
        "senderLink":"", "quoteLink":"http://forismatic.com/en/26df4228aa/"}
        */

        this.postQuoteJSON(req, callback, "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en");
  },
  getQuotesOnDesignQuoteJSON: function(req, callback) {
    //http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1
    /*
        [{"ID":2145,
        "title":"John Underkoffler",
        "content":"<p>Design is crucially important. We can&#8217;t have advances in technology any longer, unless design is integrated from the very start.<\/p>\n",
        "link":"https:\/\/quotesondesign.com\/john-underkoffler\/",
    */

    this.getQuoteJSON(req, callback, "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&jsoncallback=quote");
  }
}