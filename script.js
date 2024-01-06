// we will do a demo... No books will be store on the device (localStorage) or db
// we can do it using session storage because session storage will be free once the windows is closed
var myLibrary = []

const add_button = document.getElementById('add-button');
const add_book_dialog = document.getElementById('add-book-dialog');
const submit_dialog_button = document.getElementById('submit-button');
const close_dialog_button = document.getElementById('close-button');
const book_title = document.getElementById('book_title');
const book_author = document.getElementById('author');
const book_pages = document.getElementById('num_pages');
const have_read = document.getElementById('read');
const bookshelf = document.getElementById('bookshelf');

add_button.addEventListener('click', ()=>{
  add_book_dialog.showModal();
});

close_dialog_button.addEventListener('click', ()=>{
  add_book_dialog.close();
});

submit_dialog_button.addEventListener('click', (event)=>{
  event.preventDefault(); // a simple way ... things will be gone when page refresh
  if(book_title.value === "" || book_author.value === "" || book_pages.value === ""){
    return;
  }
  add_book_dialog.close();  // mimic the behavior of closing due to submit
  addBookToLibrary();
  localStorage.setItem('books', JSON.stringify(myLibrary));
  renderBooks();
});

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(){
  let a_book = new Book(book_title.value, book_author.value, book_pages.value, have_read.checked)
  myLibrary.push(a_book)

  // clear form
  book_title.value = null;
  book_author.value = null;
  book_pages.value = null;
  have_read.checked = false;
}

function getBooksFromLocal(){
  console.log("hello")
  let temp = localStorage.getItem('books');
  if(temp){
    myLibrary = JSON.parse(temp);
  }
  else {
    myLibrary = [];
  }
}

// render books 
function renderBooks(){
  getBooksFromLocal();
  bookshelf.innerHTML = "";
  // use "of" for an iterable object if index is ignored
  for(let i = 0; i < myLibrary.length; i++){ 
    let item = myLibrary[i]
    let bookHTML = `
    <div class="bookcard" key="${i}">
      <div class="bookcard-title"> Title: 
        <div> ${item.title} </div>
      </div>
      <div class="bookcard-author"> Author: 
        <div> ${item.author} </div>
      </div>
      <div class="bookcard-pages"> Number of Pages: 
        <div> ${item.pages} </div>
      </div>
      <div class="bookcard-read"> Finish? 
        <span class=" ${item.read ? "fin-read" : "unfin-read"} "> 
          ${item.read ? 'YES' : 'NO'} 
        </span> 
      </div>
      <div class="bookcard-control">
        <button type="button" class="card-button mark-button ${item.read ? "unmark-but" : "mark-but" }" onclick="markBook(${i})"> ${item.read ? "Unmark" : "Mark"} </button>
        <button type="button" class="card-button remove-button" onclick="removeBook(${i})"> Remove </button>
      </div>
    </div>
    `;
    bookshelf.insertAdjacentHTML("afterbegin", bookHTML);
  }
}

function markBook(key_val){
  myLibrary[key_val].read = !myLibrary[key_val].read;
  localStorage.setItem("books", JSON.stringify(myLibrary));
  renderBooks();
}

function removeBook(key_val){
  myLibrary.splice(key_val, 1);
  if(myLibrary.length == 0){
    localStorage.removeItem("books");
  }
  else{
    localStorage.setItem("books", JSON.stringify(myLibrary));
  }
  renderBooks();
}

renderBooks();