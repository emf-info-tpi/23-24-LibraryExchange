var BASE_URL = "http://localhost/23-24-LibraryExchange/Server/";

function requestLogin(username, password, successCallback, errorCallback) {
  $.ajax({
    type: "POST",
    url: BASE_URL + "userManager.php",
    data: "status=login&username=" + username + "&password=" + password,
    success: successCallback,
    error: errorCallback,
  });
}

function requestNewUser(username, password, successCallback, errorCallback) {
  $.ajax({
    type: "POST",
    url: BASE_URL + "userManager.php",
    data: "status=new&username=" + username + "&password=" + password,
    success: successCallback,
    error: errorCallback,
  });
}

function requestBooks(successCallback, errorCallback) {

  $.ajax({
    type: "GET",
    dataType: "text",
    url: BASE_URL + "bookManager.php",
    //data: "status=login&username=" + username + "&password=" + password,
    success: successCallback,
    error: errorCallback,
  });
}

function requestUpdateBookDetails(isbn, name, number, successCallback, errorCallback) {
  $.ajax({
    type: "POST",
    //dataType: "text",
    url: BASE_URL + "bookManager.php",
    data: "isbn=" + isbn + "&name=" + name + "&number=" + number,
    success: successCallback,
    error: errorCallback,
  });
}

function requestBookDetails(pk_book,successCallback, errorCallback) {

  $.ajax({
    type: "GET",
    dataType: "text",
    url: BASE_URL + "bookManager.php?pk_book="+pk_book,
    success: successCallback,
    error: errorCallback,
  });
}