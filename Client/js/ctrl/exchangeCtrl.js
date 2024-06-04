document.addEventListener("DOMContentLoaded", () => {
    console.log("page is loaded");
    let url = new URLSearchParams(window.location.search);
    if (url.has('pk_exchange')) {
        document.getElementById("exchange").innerHTML = '<div id="exchange">' +
            '<label for="alias">Exchange with an alias:</label>' +
            '<br/>' +
            '<input type="text" id="alias" name="alias">' +
            '<button type="button" onclick="alias()" >OK</button>' +
            '<br/>' +
            '<label>OR</label>' +
            '<br/>' +
            '<label for="QR" >Exchange with a user:</label>' +
            '<br/>' +
            '<img src="http://localhost/23-24-LibraryExchange/Server/exchangeManager.php?pk_exchange=' + url.get('pk_exchange') + '" />' +
            '</div>'
    } else {
        //if receiver
        document.getElementById("exchange").innerHTML = '<div id="reader" width="600px"></div>';
        let html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            /* verbose= */ false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
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

function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = `+decodedText);
    requestValidateExchange(
        decodedText,
        validateExchangeSuccess,
        validateExchangeFailure
    )
}

function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
}

function validateExchangeSuccess(){
    console.log("Exchange with QR SUCCESS");
}

function validateExchangeFailure(){
    console.log("Exchange with QR FAILURE");
}

/* deprecated due to using a get in the image
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
*/