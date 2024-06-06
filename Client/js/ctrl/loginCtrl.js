/**
 * script loginCtrl
 * @version 1.0
 * @author Guillaume Dougoud <guillaume.dougoud@studentfr.ch>
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("page is loaded");
})

function login() {
    console.log("try login");
    requestLogin(
        document.getElementById("username").value,
        document.getElementById("password").value,
        loginSuccess,
        loginFailure
    );
}

function newAccount() {
    console.log("button working");
    if (confirm("Confirm the creation of a New Account.") == true) {
        requestNewUser(
            document.getElementById("username").value,
            document.getElementById("password").value,
            newAccountSuccess,
            newAccountFailure
        );
    }
}

function loginSuccess(data) {
    console.log("login success!");
    localStorage.setItem('currentUser', data);
    window.location.href = "userLibrary.html";
}

function loginFailure() {
    alert("Login Failure.");
}

function newAccountSuccess() {
    alert("New Account Created!");
}

function newAccountFailure() {
    alert("Creating New Account Failure.");
}