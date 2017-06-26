/*
quoteBotModule
@qu0te_b0t
*/

var Twitter = require('twitter');
var scapegoat = require('scapegoat');

var quotesModule = require('./quotesModule');

var tweetLimit = 140;

var consumerKey: "",
var consumerSecret: "",
var accessTokenKey: "",
var accessTokenSecret: ""

module.exports = {
  getClient: function() {
    return new Twitter({
		consumer_key: consumerKey,
		consumer_secret: consumerSecret,
		access_token_key: accessTokenKey,
		access_token_secret: accessTokenSecret
    });
  },
  sendTweet: function(tweetText) {
    this.getClient().post('statuses/update', {
      status: tweetText
    }, function(error, tweet, response) {
      //Do something?
      if (!error) {
        //console.log(tweet);
        console.log("Tweeted...")
      } else {
        //console.log(error);
        console.log("Not Tweeted...");
      }
    });
  },
  formatQuoteAndTweet: function(quoteLength, quoteSource, quoteText, quoteAuthor) {
    var quoteSource = "\r" + quoteAuthor;

    //Format the quote the best we can (with 140 characters!)
    if (quoteLength + quoteSource.length <= tweetLimit) {
      if (quoteLength + quoteSource.length + 13 <= tweetLimit) {
        this.sendTweet("\"" + quoteText + "\"" + "\r - " + quoteAuthor + "\r#Quote");
      }
      else if (quoteLength + quoteSource.length + 5 <= tweetLimit) {
        this.sendTweet("\"" + quoteText + "\"" + "\r - " + quoteAuthor);
      }
      else if (quoteLength + quoteSource.length + 3 <= tweetLimit) {
        this.sendTweet(quoteText + "\r - " + quoteAuthor);
      }
      else if (quoteLength + quoteSource.length + 2 <= tweetLimit) {
        this.sendTweet(quoteText + "\r- " + quoteAuthor);
      }
      else {
        this.sendTweet(quoteText + quoteSource);
      }
    }
  },
  formatQuoteAuthorName: function(text) {
    return (text == "" ? "Anon" : "#" + text.split(" ").join("").split(".").join(""));
  },
  tweetAndruxNetQuote: function() {
    for(var i = 0; i < 1; i++) {
       var isQuoteTweetable = false;

        quotesModule.getAndruxNetQuoteJSON(null, function(responseObject) {
              var quoteText = responseObject.quote;
              var quoteLength = quoteText.length;
              var quoteAuthor = module.exports.formatQuoteAuthorName(responseObject.author);
              var quoteSource = "\r" + quoteAuthor;

              module.exports.formatQuoteAndTweet(quoteLength, quoteSource, quoteText, quoteAuthor);
            }
         );

        if(isQuoteTweetable) {
                break;
        }
        else {
                console.log("Quote too long...");
        }
    }
  },
  tweetForismaticQuote: function() {
        for(var i = 0; i < 1; i++) {

                var isQuoteTweetable = false;

                quotesModule.getForismaticQuoteJSON(null, function(responseObject) {
                  //TESTING
                  //console.log(responseObject);

                  var quoteText = responseObject.quoteText.trimRight();
                  var quoteLength = quoteText.length;
                  var quoteAuthor = module.exports.formatQuoteAuthorName(responseObject.quoteAuthor);
                  var quoteSource = "\r" + quoteAuthor;

                  isQuoteTweetable = quoteLength <= tweetLimit;

                  module.exports.formatQuoteAndTweet(quoteLength, quoteSource, quoteText, quoteAuthor);
                });

                if(isQuoteTweetable) {
                        break;
                }
                else {
                        console.log("Quote too long...");
                }
        }
  },
  tweetQuotesOnDesignQuote: function() {
        for(var i = 0; i < 1; i++) {

                var isQuoteTweetable = false;

                quotesModule.getQuotesOnDesignQuoteJSON(null, function(responseObject) {
                  //TESTING
                  //console.log(responseObject);

                  var responseItem = responseObject[0];
                  var quoteText = scapegoat.escape(responseItem.content.replace("<p>", "").replace("</p>", "").replace("\n", "").trimRight())
                        .split("&amp;#8217;").join("'");
                  var quoteAuthor = module.exports.formatQuoteAuthorName(responseItem.title);

                  var quoteLength = quoteText.length;
                  var quoteSource = "\r" + quoteAuthor;

                  isQuoteTweetable = quoteLength <= tweetLimit;

                  module.exports.formatQuoteAndTweet(quoteLength, quoteSource, quoteText, quoteAuthor);
                });

                if(isQuoteTweetable) {
                        break;
                }
                else {
                        console.log("Quote too long...");
                }
        }
  }
}
