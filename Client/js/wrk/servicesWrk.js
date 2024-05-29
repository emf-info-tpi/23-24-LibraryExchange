var BASE_URL = "http://localhost/23-24-LibraryExchange/Server/";

function requestLogin(username, password, successCallback, errorCallback) {
    $.ajax({
      type: "POST",
      //dataType: "",
      url: BASE_URL + "userManager.php",
      data: "status=login&username=" + username + "&password=" + password,
      success: successCallback,
      error: errorCallback,
    });
  }