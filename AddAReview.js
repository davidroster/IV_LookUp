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
