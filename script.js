/*------- Main ------- */
/*Set up a function that saves the whole library array to localStorage every time a new book is created, and another function that looks for that array in localStorage when your app is first loaded. (make sure your app doesn’t crash if the array isn’t there!) */

let myLibrary = new Map();
let id = 0;
let total = 0;
let read = 0;
let unread = 0;

function Book(title, author, date, id) {
  this.title = title;
  this.author = author;
  this.date = date;
  this.id = id;
  this.read = false;
}

/*------- Tool Bar ------- */
const totalCount = document.querySelector("#total-count");
const readCount = document.querySelector("#read-count");
const notReadCount = document.querySelector("#not-read-count");

/*------- Add Books -------*/
const form = document.querySelector(".new-book");
form.addEventListener("submit", addBookToLibrary);

function addBookToLibrary(e) {
    e.preventDefault();
    // Takes user input and stores the new book object in the array
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let date = document.querySelector("#date").value;
    let present = false;
    for(let book of myLibrary.values()) {
        if (book.title == title) {
            present = true;
        }
    }
    if (present) {
        alert("This book is already in your library.");
    } else {
        let book = new Book(title, author, date, id);
        id++;
        total++;
        unread++;
        myLibrary.set(title, book);
        totalCount.innerText = `Total Books: ${total}`;
        notReadCount.innerText = `Not Read: ${unread}`;
        displayLibrary();
        exitPopUp();
    }
}
/*------- Add Books Form Popup -------*/
const newBookContainer = document.querySelector(".new-book-container");
const addBook = document.querySelector(".add-book");
addBook.addEventListener("click", formPopUp);

function formPopUp() {
    newBookContainer.classList.remove("hide");
}

const exitForm = document.querySelector(".exit");
exitForm.addEventListener("click", exitPopUp);

function exitPopUp() {
    newBookContainer.classList.add("hide");
}

function changeStatus(e) {
    let book = myLibrary.get(e.target.closest(".book").querySelector("h3").innerText);
    book.read = !book.read;
    if (e.target.checked) {
        read++;
        unread--;
    } else {
        read--;
        unread++;
    }
    readCount.innerText = `Read: ${read}`;
    notReadCount.innerText = `Not Read: ${unread}`;
}

/*------- Book Grid -------*/
const grid = document.querySelector(".book-grid");

//write a function that loops thorugh the array and displays each book on the page. 
function displayLibrary() {
    resetGrid();
    let sorted = sortedLibrary();
    for (let book of sorted) {
        const div = document.createElement("div");
        const deleteButton = document.createElement("div");
        const title = document.createElement("h3");
        const author = document.createElement("h4");
        const datePublished = document.createElement("h4");
        const read = document.createElement("h4");
        const switchLabel = document.createElement("label")
        const input = document.createElement("input");
        const span = document.createElement("span");

        deleteButton.innerText = "✕";
        title.innerText = book.title;
        author.innerText = book.author;
        datePublished.innerText = book.date;
        input.checked = book.read;

        div.classList.add("book");
        deleteButton.classList.add("delete");
        read.classList.add("read");
        switchLabel.classList.add("switch");
        input.type = "checkbox";
        span.classList.add("slider", "round");
        input.addEventListener("change", changeStatus);

        grid.append(div);
        div.append(title);
        div.append(author);
        div.append(datePublished);
        div.append(read);
        div.append(switchLabel);
        switchLabel.append(input);
        switchLabel.append(span);
    }
}

function resetGrid() {
    grid.innerHTML = "";
}

/*------- Order Books By -------*/
const orderBy = document.querySelector("select[name='order']");
orderBy.addEventListener("change", displayLibrary);

function sortedLibrary() {
    let libraryArray =  Array.from(myLibrary.values());
    switch(orderBy.value) {
        case "date-added":
            libraryArray.sort((a, b) => a.id - b.id);
            break;
        case "date-published":
            libraryArray.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
            break;
        case "alphabetical":
            libraryArray.sort(function(a, b) {
                let textA = a.title.toUpperCase();
                let textB = b.title.toUpperCase();
                return (textA < textB) ? -1 : 1;
            });
            break;
        case "read":
            libraryArray.sort((a, b) => (a.read === b.read)? 0 : a.read? -1 : 1);
            break;
        default:
            break;
    }
    return libraryArray;
}
/*------- Delete Book -------*/

/*------- Local Memory -------*/