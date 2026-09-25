let library = [];

function Book(name, author, pages, status) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(name, author, pages, status) {
    const book = new Book(name, author, pages, status);
    library.push(book);
}

Book.prototype.changeStatus = function() {
    this.status = this.status === 'Read' ? 'Not Read' : 'Read';
}

function displayBooks() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    for (const book of library) {
        let entry = document.createElement('tr');

        let id = document.createElement('td');
        id.textContent = book.id;
        entry.appendChild(id);

        let name = document.createElement('td');
        name.textContent = book.name;
        entry.appendChild(name);

        let author = document.createElement('td');
        author.textContent = book.author;
        entry.appendChild(author);

        let pages = document.createElement('td');
        pages.textContent = book.pages;
        entry.appendChild(pages);

        let status = document.createElement('td');
        status.textContent = book.status;
        entry.appendChild(status);

        let changeStatus = document.createElement('button');
        changeStatus.textContent = 'Change Status';

        changeStatus.addEventListener('click', () => {
            book.changeStatus();
            displayBooks();
        })

        let changeStatusTd = document.createElement('td');
        changeStatusTd.appendChild(changeStatus);
        entry.appendChild(changeStatusTd);

        let del = document.createElement('button');
        del.textContent = 'Delete';
        del.dataset.id = book.id;

        del.addEventListener('click', () => {
            library = library.filter(book => book.id !== del.dataset.id);
            displayBooks();
        })

        let delTd = document.createElement('td');
        delTd.appendChild(del);
        entry.appendChild(delTd);

        tableBody.appendChild(entry);
    }
}

const newBook = document.querySelector('#new');
const dialog = document.querySelector('dialog');

newBook.addEventListener('click', () => {
    dialog.showModal();
})

const addBook = document.querySelector('#add');

addBook.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('#name');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const status = document.querySelector('#status');

    addBookToLibrary(name.value, author.value, pages.value, status.checked ? 'Read' : 'Not Read')

    displayBooks();
    dialog.close();

    name.value = null;
    author.value = null;
    pages.value = null;
    status.checked = false;
})
