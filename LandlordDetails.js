var properties = [ 
    { address: '6694 Picasso', image: 'house1.jpg' },
    { address: '6710 Trigo', image: 'house2.jpg' },
    { address: '6753 Abrego', image: 'house3.jpg' },
    { address: '6763 Abrego', image: 'house4.jpg' },
    { address: '776 Camino del Sur', image: 'house5.jpg' },
    { address: '6519 Cervantes', image: 'house6.jpg' },
    { address: '6761 Del Playa', image: 'house7.jpg' },
    { address: '750 Embarcadero del Mar', image: 'house8.jpg' },
    { address: '760 Embarcadero del Mar', image: 'house9.jpg'},
    { address: '755 Embarcadero del Norte', image: 'house10.jpg' }
];

function GeneratePropertyList(properties) {

    var original_carousel_item = document.getElementById('carousel-item');
    var original_property_item = original_carousel_item.querySelectorAll('[id="property-item"]')[0];
    var original_indicator = document.getElementById('indicator0')
    var outer_id = 0;
    var clone_carousel_item;
    var clone_property_item;
    var prev_property_item;
    var clone_indicator;

    for (var i = 0; i < properties.length; i++) {

        if (i % 4 == 0) {
            clone_carousel_item = original_carousel_item.cloneNode(true);
            clone_carousel_item.id = "carousel-item-" + i / 4;
            clone_property_item = clone_carousel_item.querySelectorAll('[id="property-item"]')[0];
            if (i != 0) {
                // Create new indicator
                clone_indicator = original_indicator.cloneNode(true);
                clone_indicator.classList.remove('active');
                clone_indicator.setAttribute('data-slide-to', i/4);
                clone_indicator.id = 'indicator' + i/4;
                original_indicator.parentNode.appendChild(clone_indicator);
                // Remove active class from carousel item
                clone_carousel_item.classList.remove('active');
            }
        }
        else {
            clone_property_item = original_property_item.cloneNode(true);
        }
        clone_property_item.id = "property-item-" + i;
        clone_property_item.querySelectorAll('[id="property-thumbnail"]')[0].src = properties[i].image;
        var addr = properties[i].address;
        if (addr.length <= 18) {
            //addr += "\n&nbsp;";
            //clone_property_item.querySelectorAll('[id="property-caption"]')[0].style = "margin-bottom: 5%"
        }
        clone_property_item.querySelectorAll('[id="property-caption"]')[0].innerHTML = addr;

        if (i % 4 == 0) {
            original_carousel_item.parentNode.appendChild(clone_carousel_item);
        }
        else {
            prev_property_item.parentNode.appendChild(clone_property_item);
        }
        prev_property_item = clone_property_item;
    }
    original_carousel_item.remove();
}

document.addEventListener("DOMContentLoaded", function(event) {
    GeneratePropertyList(properties);
});