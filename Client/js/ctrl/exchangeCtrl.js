document.addEventListener("DOMContentLoaded", () => {
    console.log("page is loaded");
    let url = new URLSearchParams(window.location.search);
    if (url.has('pk_exchange')) {
        document.getElementById("deleteBtn").disabled = false;
        requestBookDetails(url.get('pk_book'), bookDetailsSuccess, bookDetailsFailure);
    } else {
        //if receiver
    }
})