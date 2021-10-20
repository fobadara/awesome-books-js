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

  const add = container.querySelector('.add'); 
  const title = container.querySelector('.title').value; 
  const author = container.querySelector('.author').value; 

class Library {
  addBooks = (title, author) => {
    const book = {title, author};
    console.log(book);
    books.push(book); 
  }

  // addBooks = (title, author) => {
  //   this.book = new NewBks(title, author); 
  // }

  editLocalStorage = (index) => {
    if(localStorage.books) {
      books = JSON.parse(localStorage.books);
      const data = books.filter((book) => book !== books[index]); 
      localStorage.setItem('books', JSON.stringify(data));  
    }
  }
}

const library = new Library();
// library.addBooks();
// library.editLocalStorage();