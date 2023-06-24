// List of all the elements with the class name "cx-MuiTypography-root.cx-MuiTypography-body2.cx-MuiTypography-noWrap"
var divs = document.querySelectorAll(".cx-MuiTypography-root.cx-MuiTypography-body2.cx-MuiTypography-noWrap");

// Loop through the list of elements and print the text content of each element with role="cell"
// At an interval of 5, this returns the names of the professors
for (var i = 0; i < divs.length; i = i + 5) { // replace i = i + 5 with i++ to return all the divs (these divs include class time, location, etc.)
    if (divs[i].getAttribute("role") === "cell") {
        var cellText = divs[i].textContent;
        console.log(cellText);
    }
}