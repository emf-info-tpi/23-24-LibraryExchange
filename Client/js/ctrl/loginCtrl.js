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
    requestNewUser(
        document.getElementById("username").value,
        document.getElementById("password").value,
        newAccountSuccess,
        newAccountFailure
    );
}

function loginSuccess(data) {
    console.log("login success!");
    localStorage.setItem('currentUser', data);
    window.location.href = "userLibrary.html";
}

function loginFailure() {
    console.log("login failure");
}

function newAccountSuccess() {
    console.log("new Account created!!");
}

function newAccountFailure() {
    console.log("uhoh")
}