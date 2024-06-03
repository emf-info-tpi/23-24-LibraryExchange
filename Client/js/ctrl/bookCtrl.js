document.addEventListener("DOMContentLoaded", () => {
    console.log("page is loaded");
    requestBookDetails(new URLSearchParams(window.location.search).get('pk_book'), bookDetailsSuccess, bookDetailsFailure);
})

function back() {
    window.location.href = "userLibrary.html";
}

function validation() {
    let url = new URLSearchParams(window.location.search);
    if (url.has('pk_book')) {
        requestUpdateBookDetails(
            new URLSearchParams(window.location.search).get('pk_book'),
            document.getElementById("isbn").value,
            document.getElementById("name").value,
            document.getElementById("number").value,
            updateBookDetailsSuccess,
            updateBookDetailsFailure
        );
    } else {
        requestCreateBookDetails(
            document.getElementById("isbn").value,
            document.getElementById("name").value,
            document.getElementById("number").value,
            updateBookDetailsSuccess,
            updateBookDetailsFailure
        );
    }
}

function updateBookDetailsSuccess() {
    window.location.href = "userLibrary.html";
}

function updateBookDetailsFailure() {
    console.log("an error as occured during the upload");
}

function bookDetailsSuccess(data) {
    let bookDetails = JSON.parse(data);
    document.getElementById("isbn").value = bookDetails.isbn;
    document.getElementById("name").value = bookDetails.name;
    document.getElementById("number").value = bookDetails.number;
}

function bookDetailsFailure() {
    console.log('les détails du livre sont introuvables');
}