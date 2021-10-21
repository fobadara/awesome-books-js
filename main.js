/* eslint-disable linebreak-style */
// eslint-disable-next-line max-classes-per-file
let books = JSON.parse(localStorage.getItem('books'));
localStorage.setItem('books', JSON.stringify(books));
let storedBooks = JSON.parse(localStorage.getItem('books'));

class Library {
  removeBook = (event) => {
    for (let index = 0; index < storedBooks.length; index += 1) {
      if (event.target.id === `${index}`) {
        storedBooks.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(storedBooks));
        storedBooks = JSON.parse(localStorage.getItem('books'));
        window.location.reload();
      }
    }
  }

  renderBooks() {
    for (let i = 0; i < storedBooks.length; i += 1) {
      // Create elements
      this.fragment = new DocumentFragment();
      this.p = storedBooks[i];
      this.ul = document.createElement('ul');
      this.ul.classList.add('d-flex');
      this.content = document.createElement('li');
      this.content.classList.add('rows');
      this.content.classList.add('d-flex');
      this.span = document.createElement('span');
      this.spanclass = this.span.classList.add('title-span');
      this.span.innerHTML = `${i + 1}. <span>"${this.p.title}" by "${this.p.author}"<span>`;
      this.removeBtn = document.createElement('button');
      this.removeBtn.id = i;
      this.removeBtn.classList.add('remove-btn');
      this.removeBtn.innerText = 'Remove';
      // RemoveBtn event listener
      this.removeBtn.addEventListener('click', this.removeBook);
      // Style element
      this.ul.style.cssText = 'border-bottom: solid rgb(209, 209, 207);';
      this.removeBtn.style.cssText = 'margin-bottom: 0.5em; border: solid thin rgba(216, 72, 72, 0.2); border-radius: 0.5em;';
      // Append elements
      this.content.appendChild(this.span);
      this.ul.append(this.content, this.removeBtn);
      this.fragment.append(this.ul);
      this.mainContainer = document.querySelector('.main-container');
      this.mainContainer.appendChild(this.fragment);
    }
  }

  checkRender() {
    if (storedBooks !== null) {
      this.renderBooks();
    } else {
      storedBooks = [];
      books = [];
      this.renderBooks();
    }
  }

  addBook = () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const book = { title, author };
    this.error = document.querySelector('.error');
    if (!title || !author) {
      this.error.innerText = 'Empty field not allowed';
      this.error.style.cssText = 'color: red; margin-top: 0.5em';
    } else if (title.length > 20 || author.length > 20) {
      this.error.innerText = 'That\'s funny. But a name cannot be above twenty letters';
      this.error.style.cssText = 'color: red; margin-top: 0.5em';
    } else {
      storedBooks = storedBooks.filter((book) => book.title !== title || book.author !== author);
      storedBooks.push(book);
      books.push(book);
      localStorage.setItem('books', JSON.stringify(storedBooks));
      storedBooks = JSON.parse(localStorage.getItem('books'));
      window.location.reload();
      // Make add new button work when you navigate to home from add new
      window.location.hash = '#list';
    }
  }

  addEvent() {
    document.getElementById('btn').addEventListener('click', this.addBook);
  }
}

const library = new Library();
library.addEvent();
library.checkRender();

class LoadContent {
  // Load page content

  loadPage() {
    // eslint-disable-next-line no-restricted-globals
    this.hash = location.hash;
    this.display = document.querySelectorAll('.display');
    if (this.display) {
      this.display.forEach((element) => {
        element.classList.replace('display', 'hidden');
      });
    }

    // Display appropriate content
    this.element = document.querySelectorAll(`.${this.hash.substr(1)}`);
    for (let i = 0; i < this.element.length; i += 1) {
      this.element[i].classList.replace('hidden', 'display');
    }
  }

  displayTime() {
    // eslint-disable-next-line no-undef
    this.DateTime = luxon.DateTime.now();
    this.date = document.querySelector('.date');
    // eslint-disable-next-line no-undef
    this.date.innerText = `Date/Time: ${this.DateTime.toLocaleString(luxon.DateTime.DATETIME_MED)}`;
  }

  // Listen for events
  windowEvent() {
    this.list = document.querySelectorAll('.list');
    this.list.forEach((element) => {
      window.location.hash = '#list';
      element.classList.replace('hidden', 'display');
    });

    window.addEventListener('hashchange', this.loadPage);
  }
}

const loadContent = new LoadContent();
loadContent.windowEvent();
loadContent.displayTime();
