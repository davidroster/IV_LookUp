addresses = ['6694 Picasso', '6710 Trigo', '6753 Abrego', '6763 Abrego', '776 Camino del Sur', '6519 Cervantes', '6761 Del Playa', '750 Embarcadero del Mar', '760 Embarcadero del Mar', '755 Embarcadero del Norte']
var select = document.getElementById("locationInput");
var inner_string = "";
for(var i = 0; i < addresses.length; i++) {
    inner_string += "<option>";
    inner_string += addresses[i];
    inner_string += "</option>";
}
select.innerHTML = inner_string;

function callAddReview() {
  var address = $("input[name='locationInput']:selected").val();
  var rating = $("input[name='rating']:checked").val();
  var name = $("input[name='nameInput']").val();
  var date = $("input[name='dateInput']").val()
  var review = $("input[name='reviewInput']").val();

  AddReview(address, rating, name, date, review);
}

function AddReview(address, rating, name, date, review) {
  var currentReview = {
    address: address,
    rating: rating,
    name: name,
    date: date,
    review: review
  }

}
