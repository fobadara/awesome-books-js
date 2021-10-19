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
