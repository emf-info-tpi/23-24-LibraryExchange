let selectedBooks = [];

document.addEventListener("DOMContentLoaded", () => {
    console.log("user is connected");
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
        bookView += '<div><input type="checkbox" id="chk' + book.pk_book + '" onclick="check(' + book.pk_book + ')" /><label for="' + book.name + '" onclick="updateBook(' + book.pk_book + ')">' + book.name + ' n° ' + book.number + '</label></div>'
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
        selectedBooks.splice(index,1);
    }
    console.log(selectedBooks);
}

function exchange(){
    if (selectedBooks.length){
        console.log("You want to exchange the following: "+selectedBooks);
        requestExchange(
            selectedBooks,
            exchangeSuccess,
            exchangeFailure
        );
    } else {
        console.log("You want to receive some books");

    }

}

function exchangeSuccess(data){
    window.location.href = "exchange.html?pk_exchange=" + encodeURIComponent(data);
}

function exchangeFailure(){
    console.log("problem with the creation of a new exchange");
}