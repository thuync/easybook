function getElement(indentify) {
  var idEl = $("#" + indentify);
  if (idEl.length == 0) {
    idEl = $("." + indentify);
    if (idEl.length == 0) {
      idEl = $(indentify);
      if (idEl.length == 0) {
        console.error("Not found element: " + indentify);
        return null
      }
    }
    idEl = $(idEl[0]);
  }
  return idEl;
}

function onlyRemain(remainIndentify, parrentIdentify) {
  var remainEl = getElement(remainIndentify);
  var parrentEl = getElement(parrentIdentify);

  if (!remainEl || !parrentEl) {
    console.error("Not found element: " + remainIndentify + " or " + parrentIdentify);
    return;
  }
  var remainEl = remainEl.detach();
  console.log(parrentEl);
  parrentEl.empty().append(remainEl);
}


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "print_page") {
      onlyRemain('container', 'body');
      onlyRemain('js-toc', 'container');
      onlyRemain('section[role="document"]', 'js-toc');
      onlyRemain('sbo-rt-content', 'section[role="document"]');
      window.print();
    }
  }
);