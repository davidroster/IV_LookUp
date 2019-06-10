// Test data. Input for GenerateLandlordList() must be in this format
var landlords = [
    {name: 'Wolfe and Associates', image: 'wolfe_and_associates.png', rating: 5.0, phone: '(805) 964-6770', address: '173 Chapel St, Santa Barbara, CA 93111', website: 'https://www.rlwa.com/'},
    {name: 'Meridian Group', image: 'meridian_group.png', rating: 3.4, phone: '(805) 692-2500', address: '5290 Overpass Rd Building D, Santa Barbara, CA 93111', website: 'https://meridiangrouprem.com/'},
    {name: 'Sierra Property Management', image: 'sierra.jpg', rating: 1.2, phone: '(805) 692-1520', address: '5290 Overpass Rd, Bldg C, Santa Barbara, CA 93111', website: 'http://sierrapropsb.com/'}
];

// Function to generate list of landlords with all of their info
function GenerateLandlordList(landlords) {

    // Get original list item to clone
    var original = document.getElementById('landlord-item');
    var rating = 0;
    
    // Iterate landlord list, clone a list item for each, set its info, and append to list
    for (var i = 0; i < landlords.length; i++) {

        // Clone original list item and give it a unique id
        var clone = original.cloneNode(true);
        clone.id = 'landlord-item-' + i;

        // Fill the name and logo
        clone.querySelectorAll('[id="landlord-name"]')[0].innerHTML = landlords[i].name;
        clone.querySelectorAll('[id="logo"]')[0].src = landlords[i].image;

        // Fill stars based on rating
        rating = landlords[i].rating;
        for (j = 0; j < 5; j++) {
            var star = '[id="star' + j + '"]';
            if (j+1 <= rating) {
                clone.querySelectorAll(star)[0].classList.remove('btn-default');
                clone.querySelectorAll(star)[0].classList.remove('btn-grey');
                clone.querySelectorAll(star)[0].classList.add('btn-warning');
            }
            else {
                clone.querySelectorAll(star)[0].classList.add('btn-default');
                clone.querySelectorAll(star)[0].classList.add('btn-grey');
                clone.querySelectorAll(star)[0].classList.remove('btn-warning');
            }
        }

        // Fill the rating, link to details page, phone number, address, and website link
        clone.querySelectorAll('[id="avg-rating"]')[0].innerHTML = rating;
        clone.querySelectorAll('[id="link-to-details"]')[0].href = "LandlordDetails.html?landlord_name='" + landlords[i].name + "'";
        clone.querySelectorAll('[id="landlord-phone-address"]')[0].innerHTML = landlords[i].phone + ' - ' + landlords[i].address;
        clone.querySelectorAll('[id="go-to-website"]')[0].href = landlords[i].website;
        clone.querySelectorAll('[id="view-properties-on-map"]')[0].href = "map.html?type='landlord'&value='" + landlords[i].name + "'";

        // Append new list item to list
        original.parentNode.appendChild(clone);
    }

    // Remove the original (dummy) list item
    original.remove();
}

// Generate Landlord List
document.addEventListener("DOMContentLoaded", function(event) {
    GenerateLandlordList(landlords);
});
