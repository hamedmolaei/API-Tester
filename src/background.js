chrome.browserAction.onClicked.addListener(function (tab) {
  //chrome.tabs.create({ 'url': 'index.html' });
  window.open("index.html", "_blank", "width=1100,height=700");
});

//chrome.tabs.create({ url: chrome.extension.getURL('index.html') });
