class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}


class UI {

  addBookToList(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');
    container.insertBefore(div, form);
    setTimeout(function () {
      div.style.display = 'none';

    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
}

//Event listener for AddBook
document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);
  const ui = new UI();

  //validate
  if (title === '' || author === '' || isbn === '') {
    //error
    ui.showAlert('please fill in all fields', 'error');
  } else {
    ui.addBookToList(book);
    ui.clearFields();
    ui.showAlert('Book Added Succesfully', 'success');
  }
});

//event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('Book removed', 'success');
});