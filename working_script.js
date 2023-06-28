const iframe = document.querySelector('iframe');
const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
const divs = iframeDocument.querySelectorAll(".cx-MuiTypography-root.cx-MuiTypography-body2.cx-MuiTypography-noWrap");

for (let i = 0; i < divs.length; i += 5) {
    if (divs[i].getAttribute("role") === "cell") {
        const cellText = divs[i].textContent;
        console.log(cellText);
    }
}