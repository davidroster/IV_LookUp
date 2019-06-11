function AddReview() {

  var landlord = $("input[name='landlord']:checked").val();
  var address = $("input[name='locationInput']:selected").val();
  var rating = $("input[name='rating']:checked").val();
  var name = $("input[name='nameInput']").val();
  var date = $("input[name='dateInput']").val()
  var review = $("input[name='reviewInput']").val();


  var currentReview = {
    landlord: landlord,
    address: address,
    rating: rating,
    name: name,
    date: date,
    review: review
  }

}
