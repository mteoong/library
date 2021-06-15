/*------- Main ------- */
let myLibrary = [];
let id = 0;

function Book(title, author, date, id) {
  this.title = title;
  this.author = author;
  this.date = date;
  this.id = id;
  this.read = false;
}

function addBookToLibrary(title, author, date, id) {
    // Takes user input and stores the new book object in the array
    let book = new Book(title, author, date, id);
    id++;
    myLibrary.push(book);
}

//write a function that loops thorugh the array and displays each book on the page. 

/*------- Tool Bar ------- */
const totalCount = document.querySelector("#total-count");
const readCount = document.querySelector("#read-count");
const notReadCount = document.querySelector("#not-read-count");

/*------- Add Books -------*/

/*------- Book Grid -------*/
const grid = document.querySelector(".new-book-container");