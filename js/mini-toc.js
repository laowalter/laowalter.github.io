// Create a custom page TOC ("mini TOC")
function buildMiniToc() {
  var ToC;
  $('.content h2').each(function (i, el) {
    // Replace &lt;` and `&gt;` in the HTML headings with `<` and `>` to
    // support using these character entities in the source heading text and
    // avoid interpreting them as HTML tags. The current drawback is that
    // escaped `\&lt;` or `\&gt;` uses in the source heading text will appear
    // in them mini-TOC as `<` and `>` instead of `&lt;` and `&gt;`.
    var title = $(el).text().replace(/</g, '&lt;').replace(/>/g, '&gt');
    var link = '#' + $(el).attr('id');
    ToC = '<li><a href="' + link + '">' + title + '</a></li>';

    // Display the mini TOC only if page has TOC-level headings (currently, h2)
    $('ul.toc-js').append(ToC);
  });

  $(".mini-toc-header").click(function() {
    $("#TableOfContents").slideToggle(200);
    $(".mini-toc i").toggleClass("fa-caret-right");
    $(".mini-toc i").toggleClass("fa-caret-down");
  });

  $(window).scroll(function() {
    var windScroll  = $(this).scrollTop();
    windScroll > 200 ? $('#scroll-top').show() : $('#scroll-top').hide();
    if (windScroll) {
      $(".doc-content > h2, h3, h4").each(function() {
        if ($(this).position().top <= windScroll + 56) {
          var activeHeader = $("#TableOfContents").find('[href="#' + $(this).attr('id') + '"]');

          if (activeHeader.length) {
            $("#TableOfContents").find("a").removeClass("active");
            activeHeader.addClass("active");
          }
        }
      })
    }
  }).scroll();

  $(window).resize(function() {
   if ( $(window).width() > 1143 ){
       $('.mini-toc-header i').removeClass('fa-caret-right').addClass('fa-caret-down');
       $('#TableOfContents').show();
   } else {
       $('.mini-toc-header i').removeClass('fa-caret-down').addClass('fa-caret-right');
       $('#TableOfContents').hide();
   }
  }).resize();
}
