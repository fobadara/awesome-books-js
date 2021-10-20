const container = document.querySelector('.container');

let books = [];
container.innerHTML = `
<div class="books"></div>
<form class = "form-cont d-flex">
    <input type="text" class="title" placeholder="Title" required><br><br>
    <input type="text" class="author" placeholder="Author" required class><br><br>
    <button class="add">Add</button>
    </form>
`;

const bookContainer = container.querySelector('.books');
const add = container.querySelector('.add');
const title = container.querySelector('.title');
const author = container.querySelector('.author');

class Library {
  addBooks = (title, author) => {
    // this.title = title;
    // this.author = author;
    const book = { title, author };
    books.push(book);
  }

  editLocalStorage = (index) => {
    books = JSON.parse(localStorage.books);
    const data = books.filter((book) => book !== books[index]);
    localStorage.setItem('books', JSON.stringify(data));
  }

  removeBook = (index) => {
    books = books.filter((item) => item !== books[index]);
  }

  displayBooks = (arr) => {
    bookContainer.innerHTML = '';
    for (let i = 0; i < arr.length; i += 1) {
      const x = ` 
    <p class= "rows">${arr[i].title}</p>
    <p class= "rows">${arr[i].author}</p>
    <button class="remove">Remove</button>
    `;
      bookContainer.innerHTML += x;
    }
    const remove = container.querySelectorAll('.remove');
    remove.forEach((btn, index) => btn.addEventListener('click', () => {
      this.removeBook(index);
      this.displayBooks(books);
      this.editLocalStorage(index);
    }));

    add.addEventListener('click', (e) => {
      if (title.value !== '' && author.value !== '') {
        e.preventDefault();
        this.addBooks(title.value, author.value);
        localStorage.setItem('books', JSON.stringify(books));
        this.displayBooks(books);
        title.value = '';
        author.value = '';
      }
    });
  }
}

const library = new Library();

window.addEventListener('DOMContentLoaded', () => {
  books = JSON.parse(localStorage.books);
  library.displayBooks(books);
});
