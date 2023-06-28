document.getElementById('run-script').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {
                code: `
                // Function is used here, so that variables created are limited in scope and get deleted after use
                (async function() {
                    const binId = '649bc2409d312622a37708a1';
                    const response = await fetch(\`https://api.jsonbin.io/v3/b/\${binId}/latest\`);
                    const data = await response.json();
                    const ratings = data.record.reduce((acc, item) => {
                        acc[item.name] = item.rating;
                        return acc;
                    }, {});
                    // Access the iframe
                    let iframe = document.querySelector('iframe');
                    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                    const divs = iframeDocument.querySelectorAll(".cx-MuiTypography-root.cx-MuiTypography-body2.cx-MuiTypography-noWrap");

                    // Loop through the divs, to access the professor names
                    for (let i = 0; i < divs.length; i += 5) {
                        if (divs[i].getAttribute("role") === "cell") {
                            const cellText = divs[i].textContent;
                            console.log(cellText);

                            // Insert the rating to the next div
                            if (i + 1 < divs.length) {
                                const nextDiv = divs[i + 1];
                                const ratingSpan = document.createElement('span');
                                let rating = ratings[cellText];

                                // If the name is not found, try reversing the name (first name last name -> last name first name)
                                if (rating === undefined) {
                                    const reversedName = cellText.split(' ').reverse().join(' ');
                                    rating = ratings[reversedName];
                                }

                                // If the name is still not found, return N/A
                                ratingSpan.textContent = rating !== undefined ? rating : 'N/A';
                                
                                // Style the rating
                                ratingSpan.style.color = 'white';
                                ratingSpan.style.backgroundColor = 'darkgreen';
                                ratingSpan.style.padding = '2px 4px';
                                ratingSpan.style.borderRadius = '3px';
                                ratingSpan.style.fontSize = 'larger';
                                nextDiv.insertBefore(ratingSpan, nextDiv.firstChild);
                                nextDiv.insertBefore(document.createTextNode(' '), nextDiv.firstChild);
                                console.log(ratings[cellText])
                            }
                        }
                    }

                    // Delete the iframe variable
                    iframe = null;
                })();
            `});
    });
});
