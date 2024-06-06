/**
 * script bookCtrl
 * @version 1.0
 * @author Guillaume Dougoud <guillaume.dougoud@studentfr.ch>
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("page is loaded");
    let url = new URLSearchParams(window.location.search);
    if (url.has('pk_book')) {
        document.getElementById("deleteBtn").disabled = false;
        requestBookDetails(url.get('pk_book'), bookDetailsSuccess, bookDetailsFailure);
    } else {
        document.getElementById("deleteBtn").disabled = true;
    }
})

function back() {
    window.location.href = "userLibrary.html";
}

function validation() {
    let url = new URLSearchParams(window.location.search);
    if (url.has('pk_book')) {
        if (confirm("Confirm the Update of this Book.") == true) {
            requestUpdateBookDetails(
                url.get('pk_book'),
                document.getElementById("isbn").value,
                document.getElementById("name").value,
                document.getElementById("number").value,
                updateBookDetailsSuccess,
                updateBookDetailsFailure
            );
        }
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
    console.log('no details found');
}

function deleteBook() {
    let url = new URLSearchParams(window.location.search);
    if (url.has('pk_book')) {
        if (confirm("Are you sure you want to Delete this Book?") == true) {
            requestDeleteBook(
                url.get('pk_book'),
                deleteBookSuccess,
                deleteBookFailure
            );
        }
    }

    function deleteBookSuccess() {
        window.location.href = "userLibrary.html";
        console.log('the book has been deleted');
    }

    function deleteBookFailure() {
        console.log('THIS BOOK IS IMORTAL');
    }
}