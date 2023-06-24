// const data = await import("data.js")
const search_button = document.getElementById('search-button');
const input = document.getElementById('name');

var classes = {
  BIO213: [
    { name: "Praveen Babu", rating: 4 },
    { name: "Jane Smith", rating: 3.5 },
    { name: "John Doe", rating: 2.5 }
  ],
  CPE101: [
    { name: "Zoe Wood", rating: 4.5 },
    { name: "Clark Turner", rating: 4 },
    { name: "David Janzen", rating: 3.5 }
  ],
  MATH141: [
    { name: "James Dilts", rating: 3 },
    { name: "Mary Jones", rating: 2 },
    { name: "Robert Miller", rating: 1.5 }
  ]
};

function getProfessors(className) {
  if (classes.hasOwnProperty(className)) {
    var professors = classes[className];
    var output = [];
    for (var i = 0; i < professors.length; i++) {
      output.push(professors[i].name + ": " + professors[i].rating + "\n");
    }
    return output;
  } else {
    return "Invalid class name";
  }
}
// MODIFY userInput to pull from schedule builder{   }

async function getUrl(search_button, input) {
  return new Promise((resolve, reject) => {
    search_button.addEventListener("click", function(event) {
      event.preventDefault(); // Prevent the form from submitting
      const userInput = String(input.value);
      const classNameArr = userInput.trim().split(/\s+/);
      // const className = classNameArr[0];
      // const classNum = classNameArr[1];
      // const polyUrl = `https://polyratings.dev/search/class?term=${className}%20${classNum}`;
      resolve(classNameArr); // Resolve the promise with the polyUrl value
    });
  });
}

// Call the getUrl function and assign the result to a const
const classDataPromise = getUrl(search_button, input);


// Use the .then method to log the classData value when the promise is resolved
classDataPromise.then((classData) => {
  data = getProfessors(classData[0] + classData[1])
  document.getElementById("smname").innerHTML = data;
  // output = ""
  // for (var i = 0; i < data.length; i++){
  //   output += data[i] + "\n\n"
  // }
  // // var myElement = document.createElement("h1");
  // // myElement.innerHTML = output;
  // var myElement = document.createElement("h1");
  // myElement.className = ""
  // myElement.innerHTML = output;
  // document.body.appendChild(myElement);
});

