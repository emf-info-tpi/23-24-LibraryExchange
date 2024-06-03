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
                console.log("You want to have " + selectedBooks + " back")
                requestGiveBack(
                    selectedBooks,
                    GiveBackSuccess,
                    GiveBackFailure
                )
                break;
            case "received":
                console.log("You want to exchange the following: " + selectedBooks + " that aren't yours");
                break;
            case "mixed":
                console.log("You want to do to much things at the same time");
                break;
            default:
                console.log("I don't even know what you are trying to do");
        }

    } else {
        console.log("You want to receive some books");

    }

}

function exchangeSuccess(data) {
    window.location.href = "exchange.html?pk_exchange=" + encodeURIComponent(data);
}

function exchangeFailure() {
    console.log("problem with the creation of a new exchange");
}

function GiveBackSuccess() {
    console.log("Your books are back!!");
    window.location.href = "userLibrary.html";
}

function GiveBackFailure() {
    console.log("your books are not yours anymore...");
}