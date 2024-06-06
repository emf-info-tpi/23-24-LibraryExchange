/**
 * script exchangeCtrl
 * @version 1.0
 * @author Guillaume Dougoud <guillaume.dougoud@studentfr.ch>
 */

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
        if (confirm("Confirm the Exchange with " + document.getElementById("alias").value) == true) {
            requestExchangeWithAlias(
                url.get('pk_exchange'),
                document.getElementById("alias").value,
                exchangeWithAliasSuccess,
                exchangeWithAliasFailure
            );
        }
    }
}

function exchangeWithAliasSuccess() {
    alert("Exchange Success!");
    window.location.href = "userLibrary.html";

}

function exchangeWithAliasFailure() {
    alert("Exchange Failure!");
    window.location.href = "userLibrary.html";
}

function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ` + decodedText);
    if (confirm("Confirm the Exchange.") == true) {
        requestValidateExchange(
            decodedText,
            validateExchangeSuccess,
            validateExchangeFailure
        )
    }
}

function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
}

function validateExchangeSuccess() {
    alert("Exchange Success!");
    window.location.href = "userLibrary.html";
}

function validateExchangeFailure() {
    alert("Exchange Failure!");
    window.location.href = "userLibrary.html";
}
