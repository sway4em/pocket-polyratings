// // Get the current URL.
// const currentUrl = window.location.href;

// // Display the current URL in the console.
// console.log(currentUrl);

// let body = document.body;
// console.log(body.innerText); // For testing 

// // alert(document.title); // For testing 
// var x = document.getElementById("app");
// console.log(x.textContent);
const iframes = document.querySelectorAll("iframe");
let text = "";

 const iframe = iframes[0];
 const content = iframe.contentDocument.querySelector("body").innerText;
 text += content;

console.log(text);