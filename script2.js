chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    var element = document.querySelector("div[aria-label=\"Sections List\"]");
    console.log(element.textContent);
  }
});