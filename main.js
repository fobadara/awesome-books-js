const container = document.querySelector('.container');
let books = [];
container.innerHTML = `
<div class="books"></div>
<form>
    <input type="text" class="title" placeholder="Title" required><br><br>
    <input type="text" class="author" placeholder="Author" required class><br><br>
    <button class="add">Add</button>
    </form>
`;
function NewBooks(title, author) {
  this.title = title;
  this.author = author;
}

const add = container.querySelector('.add'); 
const title = container.querySelector('.title'); 
const author = container.querySelector('.author'); 
function addBooks(title, author) { 
  const book = new NewBooks(title, author); 
  books.push(book); 
}

function editLocalStorage(index) {
  books = JSON.parse(localStorage.books);
  const data = books.filter((book) => book !== books[index]); 
  localStorage.setItem('books', JSON.stringify(data));
}
