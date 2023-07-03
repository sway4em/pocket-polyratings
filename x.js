(function () {
    let iframe = document.querySelector('iframe');
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const divs = iframeDocument.querySelectorAll(".cx-MuiTypography-root.cx-MuiTypography-body2.cx-MuiTypography-noWrap");
    const pElements = iframeDocument.querySelectorAll('.cx-MuiTypography-root.cx-MuiTypography-h4.cx-MuiTypography-colorTextSecondary');
    const class_name_element = iframeDocument.querySelector('.cx-MuiTypography-root.d-flex.align-items-center.cx-MuiTypography-h2');
    const class_name = class_name_element.childNodes[0].nodeValue.split('-')[0].trim();

    for (let i = 0; i < divs.length; i += 5) {
        if (i % 5 != 0) {
            divs[i].textContent = divs[i + 1].textContent;
        }
        else if (divs[i].getAttribute("role") === "cell") {
            const cellText = divs[i].textContent;
            if (i + 1 < divs.length) {
                const nextDiv = divs[i + 1];
                // Check if nextDiv already contains the green text
                if (!nextDiv.querySelector('span[style*="darkgreen"]')) {
                    console.log(cellText);
                    console.log(class_name);
                    const ratingSpan = document.createElement('span');
                    let rating = ${ JSON.stringify(ratings)
                } [cellText];
                if (rating === undefined) {
                    const reversedName = cellText.split(' ').reverse().join(' ');
                    rating = ${ JSON.stringify(ratings) } [reversedName];
                }
                ratingSpan.textContent = rating !== undefined ? rating : 'N/A';
                ratingSpan.style.color = 'white';
                ratingSpan.style.backgroundColor = 'darkgreen';
                ratingSpan.style.padding = '2px 4px';
                ratingSpan.style.borderRadius = '3px';
                ratingSpan.style.fontSize = 'larger';
                nextDiv.insertBefore(ratingSpan, nextDiv.firstChild);
                nextDiv.insertBefore(document.createTextNode(' '), nextDiv.firstChild);

                // Create a popup element
                const popupElement = document.createElement('div');
                popupElement.textContent = \`Rating: \${rating !== undefined ? rating : 'N/A'} | Class name: \${class_name}\`;
                    popupElement.style.position = 'absolute';
                    popupElement.style.zIndex = 1000;
                    popupElement.style.backgroundColor = 'white';
                    popupElement.style.borderRadius = '3px';
                    popupElement.style.padding = '5px';
                    popupElement.style.display = 'none';

                    // Append the popup element to the body
                    document.body.appendChild(popupElement);

                    // Add event listeners to show/hide the popup on hover
                    ratingSpan.addEventListener('mouseover', function(event) {
                        popupElement.style.display = 'block';
                        popupElement.style.left = event.clientX + 'px';
                        popupElement.style.top = event.clientY + 'px';
                    });
                    ratingSpan.addEventListener('mouseout', function() {
                        popupElement.style.display = 'none';
                    });
                }
            }
        }
    }

    // Delete the iframe variable
    iframe = null;
})();