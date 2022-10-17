class Book {
  constructor(isbn, title, author, category, editorial, pages) {
    this.title = title;
    this.isbn = isbn;
    this.author = author;
    this.category = category;
    this.editorial = editorial;
    this.pages = pages;
  }
}
//declaro variable libros e inicializo como arreglo vacio
let books = JSON.parse(localStorage.getItem("books")) || [];
let category = [
  "Informática",
  "Autoayuda",
  "Novela",
  "Filosofía",
  "Política",
  "Comics",
];

category.forEach((categoria) => {
  let option = document.createElement("option");
  option.value = `${categoria}`;
  option.innerText = `${categoria}`;

  document.querySelector("#selectCategory").appendChild(option);
});

const myModal = document.getElementById("modalIsbn");

const librito = new Book(
  "9789871609826",
  "Vidojuegos construye tu empresa en 10 pasos",
  "Mara Ares",
  "informática",
  "Alfaomega",
  156
);

const librito2 = new Book(
  "9781231609825",
  "Consigue amigos",
  "Roberto Ponce",
  "autoayuda",
  "Casamayor",
  200
);

// books.push(librito, librito2);
// localStorage.setItem("books", JSON.stringify(books));

//Agregar un libro
const addBook = (e) => {
  e.preventDefault();

  //Con formulario de bootstrap
  let isbn = document.querySelector("#isbn").value;
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let category = document.querySelector("#selectCategory").value;
  let editorial = document.querySelector("#editorial").value;
  let pages = document.querySelector("#pages").value;

  //validamos que el isbn no exista
  const validar = searchIsbn(isbn);

  if (validar.ok) {
    console.warn("El libro ya se encuentra cargado");
    return;
  }
  //---------------------------------
  const book = {
    isbn,
    title,
    author,
    category,
    editorial,
    pages,
  };

  books.push(book);
  alert("Libro guardado");
  localStorage.setItem("books", JSON.stringify(books));
  document.querySelector("#formularioBook").reset();
  booksList(books);
};

//Consultar libro por ISBN
const searchIsbn = (isbn) => {
  let isBook = books.find((book) => {
    console.log(book);
    return book.isbn == isbn;
  });
  console.log(isBook);

  if (isBook) {
    return {
      ok: true,
      isBook,
    };
  } else {
    return {
      ok: false,
      msg: "El libro no se encuentra",
    };
  }
};

//filtrar libros por titulo
const filterTitle = (title) => {
  const searchBook = books.filter((book) => {
    return book.title.toUpperCase().includes(title.toUpperCase());
  });

  if (searchBook.length > 0) {
    booksList(searchBook);
  }
};

//listar libros
const booksList = (array) => {
  // console.log("Libros encontrados");
  // console.log("------------------");
  // array.forEach((book) => {
  //   console.log(`ISBN: ${book.isbn}`);
  //   console.log(`Título: ${book.title}`);
  //   console.log(`Autor: ${book.author}`);
  //   console.log(`Categoría: ${book.category}`);
  //   console.log(`Editorial: ${book.editorial}`);
  //   console.log(`Páginas: ${book.pages}`);
  //   console.log("-----------------------");
  // });
  // console.log(`Cantidad: ${array.length}`);

  //con Bootstrap
  document.querySelector("#cuerpoTabla").innerHTML = "";
  array.forEach((book) => {
    const tr = document.createElement("tr");
    const datos = `<th scope="row">${book.isbn}</th>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.category}</td>
    <td>
    <button class="btn btn-outline-danger btn-sm" onclick="deleteBook(${book.isbn})">x</button>
    </td>
    
    `;

    tr.innerHTML = datos;

    document.querySelector("#cuerpoTabla").appendChild(tr);
  });
  document.querySelector("#cantBook").innerText = array.length;
};

//mostrar libros según cantidad de páginas---------------
const viewForPagesMayor = (cantidad, mayor) => {
  let searchBook = [];
  if (mayor) {
    searchBook = books.filter((book) => {
      return book.pages >= cantidad;
    });
  } else {
    searchBook = books.filter((book) => {
      return book.pages <= cantidad;
    });
  }

  if (searchBook.length > 0) {
    booksList(searchBook);
  }
};

//Borrar un libro-----------------------------------
const deleteBook = (isbn) => {
  console.log(isbn);
  //usando splice
  // const index = books.findIndex((book) => {
  //   return book.isbn === isbn;
  // });

  // if (index > -1) {
  //   let validar = confirm(`Desea eliminar el libro ${books[index].title}?`);
  //   if (validar) {
  //     books.splice(index, 1);
  //     alert("Libro eliminado");
  //   }
  // } else {
  //   alert("Libro no encontrado");
  // }

  //usando filter
  let validarIsbn = searchIsbn(isbn);
  console.log(validarIsbn);

  if (validarIsbn.ok) {
    let validar = confirm(
      `Desea eliminar el libro ${validarIsbn.isBook.title}?`
    );
    if (validar) {
      let newArrayBooks = books.filter((book) => {
        return book.isbn != isbn;
      });

      books = [...newArrayBooks];
      localStorage.setItem("books", JSON.stringify(books));
      booksList(books);
    }
  } else {
    alert(validarIsbn.msg);
  }
};

//Actualizar Libro--------------------------------------
const modifyBook = (isbn) => {
  const index = books.findIndex((book) => {
    return book.isbn === isbn;
  });

  if (index > -1) {
    let newTitle =
      prompt(
        `Titulo actual: "${books[index].title}". Ingrese el nuevo título del libro`
      ) || books[index].title;
    let newAuthor =
      prompt(
        `Autor actual: "${books[index].author}". Ingrese el nuevo autor del libro`
      ) || books[index].author;
    let newCategory =
      prompt(
        `Categoría actual: "${books[index].category}". Ingrese la nueva categoría del libro`
      ) || books[index].category;
    let newEditorial =
      prompt(
        `Editorial actual: "${books[index].editorial}". Ingrese la nueva editorial del libro`
      ) || books[index].editorial;

    books[index].title = newTitle;
    books[index].author = newAuthor;
    books[index].category = newCategory;
    books[index].editorial = newEditorial;

    alert("Libro actualizado");
  }
};

//-------Mostrar MOdal ISBN---------------
const modalIsbnShow = () => {
  document.querySelector("#modalIsbnBody").innerHTML = "";
  let isbnIngresado = document.querySelector("#textBuscarIsbn").value;
  let validarIsbn = searchIsbn(isbnIngresado);
  let cuerpo = document.createElement("div");

  if (validarIsbn.ok) {
    console.log(validarIsbn.isBook.title);
    let datos = `<div class="mb-3">
    <label for="isbn" class="form-label">ISBN</label>
    <input
      type="text"
      class="form-control"
      value=${validarIsbn.isBook.isbn}
      readonly
       />
  </div>
  <div class="mb-3">
    <label for="title" class="form-label">Título</label>
    <input type="text" class="form-control" value="${validarIsbn.isBook.title}" readonly />
  </div>
  <div class="mb-3">
    <label for="author" class="form-label">Autor</label>
    <input type="text" class="form-control" value="${validarIsbn.isBook.author}" readonly/>
  </div>
  <div class="mb-3">
    <label for="category" class="form-label">Categoría</label>
    <input type="text" class="form-control" value="${validarIsbn.isBook.category}" readonly/>
  </div>
  <div class="mb-3 d-flex justify-content-between gap-2">
    <div>
      <label for="editorial" class="form-label">Editorial</label>
      <input
        type="text"
        class="form-control"
        value="${validarIsbn.isBook.editorial}"
        readonly
      />
    </div>
    <div>
      <label for="pages" class="form-label">Páginas</label>
      <input type="number" class="form-control" value="${validarIsbn.isBook.pages}" readonly />
    </div>
  </div>`;
    cuerpo.innerHTML = datos;
    document.querySelector("#modalIsbnBody").appendChild(cuerpo);
  } else {
    let datos = `<h3>No se encontraron datos a mostrar</h3>`;
    cuerpo.innerHTML = datos;
    document.querySelector("#modalIsbnBody").appendChild(cuerpo);
  }
};

document.querySelector("#formularioBook").addEventListener("submit", addBook);
booksList(books);
