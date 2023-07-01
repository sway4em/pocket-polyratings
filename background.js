let ratings;

async function fetchRatings() {
    const binId = '649bc2409d312622a37708a1';
    const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`);
    const data = await response.json();
    ratings = data.record.reduce((acc, item) => {
        acc[item.name] = item.rating;
        return acc;
    }, {});
}

fetchRatings();
setInterval(fetchRatings, 60 * 24 * 60 * 60 * 1000); // Update ratings every 60 days

// function runScript() {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.executeScript(
//             tabs[0].id,
//             {
//                 code: `
//                 (function() {
//                     let iframe = document.querySelector('iframe');
//                     const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
//                     const divs = iframeDocument.querySelectorAll(".cx-MuiTypography-root.cx-MuiTypography-body2.cx-MuiTypography-noWrap");

//                     for (let i = 0; i < divs.length; i += 5) {
//                         if (divs[i].getAttribute("role") === "cell") {
//                             const cellText = divs[i].textContent;
//                             console.log(cellText);
//                             if (i + 1 < divs.length) {
//                                 const nextDiv = divs[i + 1];
//                                 const ratingSpan = document.createElement('span');
//                                 let rating = ${JSON.stringify(ratings)}[cellText];
//                                 if (rating === undefined) {
//                                     const reversedName = cellText.split(' ').reverse().join(' ');
//                                     rating = ${JSON.stringify(ratings)}[reversedName];
//                                 }
//                                 ratingSpan.textContent = rating !== undefined ? rating : 'N/A';
//                                 ratingSpan.style.color = 'white';
//                                 ratingSpan.style.backgroundColor = 'darkgreen';
//                                 ratingSpan.style.padding = '2px 4px';
//                                 ratingSpan.style.borderRadius = '3px';
//                                 ratingSpan.style.fontSize = 'larger';
//                                 nextDiv.insertBefore(ratingSpan, nextDiv.firstChild);
//                                 nextDiv.insertBefore(document.createTextNode(' '), nextDiv.firstChild);
//                             }
//                         }
//                     }

//                     // Delete the iframe variable
//                     iframe = null;
//                 })();
//             `});
//     });
// }
function runScript() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {
                code: `
                (function() {
                    let iframe = document.querySelector('iframe');
                    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                    const divs = iframeDocument.querySelectorAll(".cx-MuiTypography-root.cx-MuiTypography-body2.cx-MuiTypography-noWrap");

                    for (let i = 0; i < divs.length; i += 5) {
                        if (divs[i].getAttribute("role") === "cell") {
                            const cellText = divs[i].textContent;
                            if (i + 1 < divs.length) {
                                const nextDiv = divs[i + 1];
                                // Check if nextDiv already contains the green text
                                if (!nextDiv.querySelector('span[style*="darkgreen"]')) {
                                    console.log(cellText);
                                    const ratingSpan = document.createElement('span');
                                    let rating = ${JSON.stringify(ratings)}[cellText];
                                    if (rating === undefined) {
                                        const reversedName = cellText.split(' ').reverse().join(' ');
                                        rating = ${JSON.stringify(ratings)}[reversedName];
                                    }
                                    ratingSpan.textContent = rating !== undefined ? rating : 'N/A';
                                    ratingSpan.style.color = 'white';
                                    ratingSpan.style.backgroundColor = 'darkgreen';
                                    ratingSpan.style.padding = '2px 4px';
                                    ratingSpan.style.borderRadius = '3px';
                                    ratingSpan.style.fontSize = 'larger';
                                    nextDiv.insertBefore(ratingSpan, nextDiv.firstChild);
                                    nextDiv.insertBefore(document.createTextNode(' '), nextDiv.firstChild);
                                }
                            }
                        }
                    }

                    // Delete the iframe variable
                    iframe = null;
                })();
            `});
    });
}


chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    if (details.url && details.url.includes('cmsweb.pscs.calpoly.edu')) {
        runScript();
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url.includes('cmsweb.pscs.calpoly.edu')) {
        runScript();

        chrome.tabs.executeScript(tab.id, {
            code: `
            var iframe = document.querySelector('iframe');
            var observer = new MutationObserver(mutations => {
                for(let mutation of mutations) {
                    if (mutation.type === 'childList') {
                        chrome.runtime.sendMessage({ action: 'runScript' });
                        break;
                    }
                }
            });
            observer.observe(iframe.contentDocument.body, { childList: true, subtree: true });
        `});
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'runScript') {
        runScript();
    }
});
