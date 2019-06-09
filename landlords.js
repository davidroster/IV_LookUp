var landlords = [
    {name: 'Wolfe and Associates', image: 'wolfe_and_associates.png', rating: 5.0, phone: '(805) 964-6770', address: '173 Chapel St, Santa Barbara, CA 93111', website: 'https://www.rlwa.com/'},
    {name: 'Meridian Group', image: 'meridian_group.png', rating: 3.4, phone: '(805) 692-2500', address: '5290 Overpass Rd Building D, Santa Barbara, CA 93111', website: 'https://meridiangrouprem.com/'},
    {name: 'Sierra Property Management', image: 'sierra.jpg', rating: 1.2, phone: '(805) 692-1520', address: '5290 Overpass Rd, Bldg C, Santa Barbara, CA 93111', website: 'http://sierrapropsb.com/'}
];

function GenerateLandlordList(landlords) {

    var original = document.getElementById('landlord-item');
    var rating = 0;
    
    for (var i = 0; i < landlords.length; i++) {
        var clone = original.cloneNode(true);
        clone.id = 'landlord-item-' + i;
        clone.querySelectorAll('[id="landlord-name"]')[0].innerHTML = landlords[i].name;
        clone.querySelectorAll('[id="logo"]')[0].src = landlords[i].image;
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

        clone.querySelectorAll('[id="avg-rating"]')[0].innerHTML = rating;
        clone.querySelectorAll('[id="landlord-phone-address"]')[0].innerHTML = landlords[i].phone + ' - ' + landlords[i].address;
        clone.querySelectorAll('[id="go-to-website"]')[0].href = landlords[i].website;
        original.parentNode.appendChild(clone);
    }

    original.remove();
}


document.addEventListener("DOMContentLoaded", function(event) {
    GenerateLandlordList(landlords);
});
