function getElement(selector) {
  var element = $("#" + selector);
  if (element.length == 0) {
    element = $("." + selector);
    if (element.length == 0) {
      element = $(selector);
      if (element.length == 0) {
        console.error("Not found element: " + selector);
        return null
      }
    }
    element = $(element[0]);
  }
  return element;
}

function keepOnly(keepSelector, parentSelector) {
  var remainEl = getElement(keepSelector);
  var parrentEl = getElement(parentSelector);

  if (!remainEl || !parrentEl) {
    console.error("Not found element: " + keepSelector + " or " + parentSelector);
    return;
  }
  var remainEl = remainEl.detach();
  console.log(parrentEl);
  parrentEl.empty().append(remainEl);
}


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "print_page") {
      keepOnly('container', 'body');
      keepOnly('js-toc', 'container');
      keepOnly('section[role="document"]', 'js-toc');
      keepOnly('sbo-rt-content', 'section[role="document"]');

      console.log('Change CSS');
      var body = $('body');
      body.css({
          "padding": "0px"
      });
      var div = $('#sbo-rt-content');
      div.css({
          "maxWidth": "100%",
          "margin": "0px",
          "padding": "0px"
      });

      var p = $('.scalefonts #sbo-rt-content div p');
      p.css({
          "textAlign": "justify"
      });

      var img = $('#sbo-rt-content .image');
      img.css({
          "textAlign": "center"
      });

      var h = $('#sbo-rt-content h2');
      h.attr('style', 'margin-top: 0px !important');

      window.print();
    }
  }
);