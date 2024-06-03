document.addEventListener("DOMContentLoaded", () => {
    console.log("page is loaded");
    let url = new URLSearchParams(window.location.search);
    if (url.has('pk_exchange')) {

    } else {
        //if receiver
    }
})

function back() {
    window.location.href = "userLibrary.html";
}

function alias() {
    let url = new URLSearchParams(window.location.search);
    if (url.has('pk_exchange')) {
        requestExchangeWithAlias(
            url.get('pk_exchange'),
            document.getElementById("alias").value,
            exchangeWithAliasSuccess,
            exchangeWithAliasFailure
        );
    }
}

function exchangeWithAliasSuccess() {
    console.log("exchange is working!!");
    window.location.href = "userLibrary.html";

}

function exchangeWithAliasFailure() {
    console.log("exchange returned an error");
}