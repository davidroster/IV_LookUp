// Test data. Input for GenerateReviewList() must be in this format
var PropertyReviews = [
    { name: 'Kari', date: new Date(1997, 5, 5), rating: 5, title: 'I love tacos', review: 'Tacos are just great, like you can have steak, carnitas, or chicken, and you can put whatever you want on them. Like you can throw some cheese, pico de gallo, onions, and cilantro on that bitch, and its delicious.' },
    { name: 'David', date: new Date(1995, 0, 9), rating: 5, title: 'Well I love icecream', review: 'I think icecream is the best. There are so many flavors, like chocolate, strawberry, vanilla, pistachio, caramel, and my personal fave, half-baked. You can have ice cream by itself or in a cake, and itll be amazeballs!!' },
    { name: 'Marco', date: new Date(1996, 11, 22), rating: 4, title: 'Chocolate chip cookies are the best tho', review: 'They are so simple, but chocolate chip cookies are always a crowd favorite. You can celebrate any occasion and eat them, or cry after a breakup and eat them. Theyre hella versitile and thats why theyre the best.' }
]

var units = [
    { unit: 'A', rent: '$1500', deposit: '$1500', bed: 1, bath: 1, utilities: 'W/T, cable, wifi', parking: '$300', image: 'house1.jpg' },
    { unit: 'B', rent: '$1500', deposit: '$1500', bed: 1, bath: 1, utilities: 'W/T, cable, wifi', parking: '$300', image: 'house1.jpg' },
    { unit: 'C', rent: '$3000', deposit: '$3000', bed: 2, bath: 2, utilities: 'W/T, cable, wifi', parking: '$300', image: 'house1.jpg' },
    { unit: 'D', rent: '$3000', deposit: '$3000', bed: 2, bath: 2, utilities: 'W/T, cable, wifi', parking: '$300', image: 'house1.jpg' },
    { unit: 'E', rent: '$3000', deposit: '$3000', bed: 2, bath: 2, utilities: 'W/T, cable, wifi', parking: '$300', image: 'house1.jpg' },
]

// Function to generate list of landlords with all of their info
function GenerateUnitList(units, addr) {

    // Get original list item to clone
    var original = document.getElementById('unit-item');
    var rating = 0;
    
    // Iterate unit list, clone a list item for each, set its info, and append to list
    for (var i = 0; i < units.length; i++) {

        // Clone original list item and give it a unique id
        var clone = original.cloneNode(true);
        clone.id = 'unit-item-' + i;

        // Fill the name and logo
        clone.querySelectorAll('[id="unit-num"]')[0].innerHTML = 'Unit ' + units[i].unit;
        clone.querySelectorAll('[id="logo"]')[0].src = units[i].image;

        // Fill the rating, link to details page, phone number, address, and website link
        clone.querySelectorAll('[id="unit-rent"]')[0].innerHTML = 'Monthly Rent: ' + units[i].rent;
        clone.querySelectorAll('[id="unit-deposit"]')[0].innerHTML = 'Deposit: ' + units[i].deposit;
        clone.querySelectorAll('[id="unit-bed-bath"]')[0].innerHTML = units[i].bed + ' bed, ' + units[i].bath + ' bath ';
        clone.querySelectorAll('[id="unit-utilities"]')[0].innerHTML = 'Utilities Included: ' + units[i].utilities;
        clone.querySelectorAll('[id="unit-parking"]')[0].innerHTML = 'Parking: ' + units[i].parking;
        clone.querySelectorAll('[id="view-properties-on-map"]')[0].href = "map.html?type='property'&value='" + addr + "'";

        // Append new list item to list
        original.parentNode.appendChild(clone);
    }

    // Remove the original (dummy) list item
    original.remove();
}


// Obtain the address that was clicked from the URL
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("'");
var addr = queries[1];

// ---------- INSERT FIREBASE CODE HERE ----------
// Get all landlord information using the address of the property (addr)

document.addEventListener("DOMContentLoaded", function (event) {

    // Generate list of units
    GenerateUnitList(units, addr);

    // Generate list of reviews
    GenerateReviewList(PropertyReviews);

    // Set the landlord name
    document.getElementById('property-name').innerHTML = addr;
    // SET RENT, DEPOSIT, BD/BR, UTILITIES, PARKING
    // SET reviews LIST

});