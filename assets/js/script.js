var currentQuote = '';
var currentAuthor = '';

$(document).ready(function() {
    
    init();
    myAnimate();
});

function myAnimate() {
    
    $("#mainQuote").animate({
          opacity: 0
        }, 500,
        function() {
        $(this).animate({
            opacity: 1
          }, 500);
        });
    
    $("#author").animate({
          opacity: 0
        }, 500,
        function() {
        $(this).animate({
            opacity: 1
          }, 500);
        });
}

function newQuote() {
    
    init();
    myAnimate();
}

function init() {

    $.ajax( {
    url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var post = data.shift();
        currentQuote = post.content;
        currentAuthor = post.title;
        $('#author').text("- " + currentAuthor);
        $('#mainQuote').html(currentQuote);
        $('#tweet').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        $('#tumblr').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          $('#quote-source').html('Source:' + post.custom_meta.Source);
        } else {
          $('#quote-source').text('');
        }
      },
      cache: false
    }); 
}
