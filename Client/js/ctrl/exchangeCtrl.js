document.addEventListener("DOMContentLoaded", () => {
    console.log("page is loaded");
    let url = new URLSearchParams(window.location.search);
    if (url.has('pk_exchange')) {
        document.getElementById("exchange").innerHTML = '<div id="exchange">' +
            '<label for="alias">Exchange with an alias:</label>' +
            '<input type="text" id="alias" name="alias">' +
            '<button type="button" onclick="alias()" >OK</button>' +
            '<br/>' +
            '<label>OR</label>' +
            '<br/>' +
            '<label for="QR" >Exchange with a user:</label>' +
            '<button type="button" onclick="generateQR()">Generate QR</button>' +
            '</div>'
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

function generateQR() {
    console.log("generating QR...");
    let url = new URLSearchParams(window.location.search);
    if (url.has('pk_exchange')) {
        requestGenerateQR(
            url.get("pk_exchange"),
            generateQRSuccess,
            generateQRFailure
        );
    }
}

function generateQRSuccess() {
    console.log("QR Code generated");
}

function generateQRFailure() {
    console.log("QR not generated");
}