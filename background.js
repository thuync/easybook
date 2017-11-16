function sendMessageToCurrentTab(message, callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, message, callback);
  });
}

chrome.browserAction.onClicked.addListener(function (tab) {
  sendMessageToCurrentTab({message: "print_page"});
});