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

function requestUpdateBookDetails(pk_book, isbn, name, number, successCallback, errorCallback) {
  $.ajax({
    type: "POST",
    url: BASE_URL + "bookManager.php",
    data: "pk_book=" + pk_book + "&isbn=" + isbn + "&name=" + name + "&number=" + number,
    success: successCallback,
    error: errorCallback,
  });
}

function requestCreateBookDetails(isbn, name, number, successCallback, errorCallback) {
  $.ajax({
    type: "POST",
    url: BASE_URL + "bookManager.php",
    data: "isbn=" + isbn + "&name=" + name + "&number=" + number,
    success: successCallback,
    error: errorCallback,
  });
}

function requestBookDetails(pk_book, successCallback, errorCallback) {

  $.ajax({
    type: "GET",
    dataType: "text",
    url: BASE_URL + "bookManager.php?pk_book=" + pk_book,
    success: successCallback,
    error: errorCallback,
  });
}

function requestDeleteBook(pk_book, successCallback, errorCallback) {

  $.ajax({
    type: "DELETE",
    url: BASE_URL + "bookManager.php",
    data: "pk_book=" + pk_book,
    success: successCallback,
    error: errorCallback,
  });
}

function requestExchange(books, successCallback, errorCallback) {
  $.ajax({
    type: "POST",
    dataType: "text",
    contentType: "application/json",
    url: BASE_URL + "exchangeManager.php",
    data: JSON.stringify({ action: "exchange", books: books }),
    success: successCallback,
    error: errorCallback,
  });
}

function requestExchangeWithAlias(pk_exchange, alias, successCallback, errorCallback) {
  $.ajax({
    type: "POST",
    dataType: "text",
    url: BASE_URL + "exchangeManager.php",
    data: "pk_exchange=" + pk_exchange + "&alias=" + alias,
    success: successCallback,
    error: errorCallback,
  });
}

function requestGiveBack(books, successCallback, errorCallback) {
  $.ajax({
    type: "POST",
    dataType: "text",
    contentType: "application/json",
    url: BASE_URL + "exchangeManager.php",
    data: JSON.stringify({ action: "giveBack", books: books }),
    success: successCallback,
    error: errorCallback,
  });
}