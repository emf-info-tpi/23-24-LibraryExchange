let selectedBooks = [];
const currentUser = localStorage.getItem('currentUser');
document.addEventListener("DOMContentLoaded", () => {
    console.log("User is connected");
    requestBooks(
        getBooksSuccess,
        getBooksFailure
    );
})

function disconnect() {
    window.location.href = "index.html";
}

function addBook() {
    window.location.href = "book.html";
}

function updateBook(pk_book) {
    console.log(pk_book);
    window.location.href = "book.html?pk_book=" + encodeURIComponent(pk_book);
}

function getBooksSuccess(data) {
    showBooks(JSON.parse(data).books);
}

function showBooks(books) {
    //TODO find a way to order books by series, name and number
    let bookView = "";

    for (let i = 0; i < books.length; i++) {
        let book = books[i];

        if (book.fk_receiver) {
            if (book.fk_owner == currentUser) {
                //we own it but it isn't here at the moment
                bookStatus = "exchanged";
            } else {
                //we don't own it, we received it from someone else
                bookStatus = "received";
            }
        } else {
            //we own it and have it at the moment
            bookStatus = "owned";
        }
        console.log(bookStatus);

        bookView += (
            '<div class="book ' + bookStatus + '">' +
            '<input type="checkbox" id="chk' + book.pk_book + '" onclick="check(' + book.pk_book + ')" />' +
            '<label for="' + book.name + '" onclick="updateBook(' + book.pk_book + ')">' +
            book.name + ' n° ' + book.number +
            '</label>' +
            '<input type="hidden" id="Status' + book.pk_book + '" value="' + bookStatus + '" />' +
            '</div>');
    }
    document.getElementById("book-list").innerHTML = bookView;
}

function getBooksFailure() {
    console.log("We were not able to find this user's Alias");
}

function check(pk_book) {
    let checkBox = document.getElementById("chk" + pk_book);
    if (checkBox.checked) {
        selectedBooks.push(pk_book);
    } else {
        let index = selectedBooks.indexOf(pk_book);
        selectedBooks.splice(index, 1);
    }
    console.log(selectedBooks);
}

function exchange() {
    if (selectedBooks.length) {
        bookStatus = document.getElementById("Status" + selectedBooks[0]).value;
        for (let i = 1; i < selectedBooks.length; i++) {
            if (bookStatus != document.getElementById("Status" + selectedBooks[i]).value) {
                bookStatus = "mixed";
                break;
            }
        }
        switch (bookStatus) {
            case "owned":
                console.log("You want to exchange the following: " + selectedBooks);
                requestExchange(
                    selectedBooks,
                    exchangeSuccess,
                    exchangeFailure
                );
                break;
            case "exchanged":
                if (confirm("Are you sure that all these Books are back?") == true) {
                    console.log("You want to have " + selectedBooks + " back")
                    requestGiveBack(
                        selectedBooks,
                        GiveBackSuccess,
                        GiveBackFailure
                    )
                }
                break;
            case "received":
                alert("You can not Exchange Books that you don't own.");
                break;
            case "mixed":
                alert("Choose only one type of Exchange please.");
                break;
            default:
                console.log("I don't even know what you are trying to do");
        }

    } else {
        console.log("You want to receive some books");
        window.location.href = "exchange.html";
    }

}

function exchangeSuccess(data) {
    window.location.href = "exchange.html?pk_exchange=" + encodeURIComponent(data);
}

function exchangeFailure() {
    alert("Unable to create a new Exchange!");
}

function GiveBackSuccess() {
    alert("Your Books are Back!");
    window.location.href = "userLibrary.html";
}

function GiveBackFailure() {
    alert("We are not able change the Status of your Books!");
}