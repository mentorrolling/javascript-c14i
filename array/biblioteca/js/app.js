class Books {
  constructor(isbn, title, author, category, editorial, pages) {
    this.title = title;
    this.isbn = isbn;
    this.author = author;
    this.category = category;
    this.editorial = editorial;
    this.pages = pages;
  }
}

const librito = new Books(
  "9789871609826",
  "Vidojuegos construye tu empresa en 10 pasos",
  "Mara Ares",
  "informática",
  "Alfaomega",
  156
);

const librito2 = new Books(
  "9781231609825",
  "Consigue amigos",
  "Roberto Ponce",
  "autoayuda",
  "Casamayor",
  200
);

//declaro variable libros e inicializo como arreglo vacio
let books = [];

// const librito = {
//   isbn: "978-987-1609-82-6",
//   title: "Vidojuegos construye tu empresa en 10 pasos",
//   author: "Mara Ares",
//   category: "informática",
//   editorial: "Alfaomega",
//   pages: 156,
// };
// const librito2 = {
//   isbn: "978-123-1609-82-5",
//   title: "Consigue amigos",
//   author: "Roberto Ponce",
//   category: "autoayuda",
//   editorial: "Casamayor",
//   pages: 200,
// };

books.push(librito, librito2);

//Agregar un libro
const addBook = () => {
  let isbn = prompt("Ingrese el ISBN del libro");
  if (!isbn) {
    return console.warn("El ISBN es obligatorio");
  }
  let title = prompt("Ingrese el título del libro");
  if (!title) {
    return console.warn("El Título es obligatorio");
  }
  let author = prompt("Ingrese el autor del libro") || "anónimo";
  let category = prompt("Ingrese la categoría del libro");
  if (!category) {
    return console.warn("La categoría es obligatori");
  }
  let editorial = prompt("Ingrese la editorial del libro");
  let pages = Number(prompt("Ingrese la cantidad de páginas del libro"));
  if (isNaN(pages) || pages <= 0) {
    return console.warn("La cantidad debe ser un número mayor que 0");
  }

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
};

//Consultar libro por ISBN
const searchIsbn = (isbn) => {
  let isBook = books.find((book) => {
    return book.isbn === isbn;
  });

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
  console.log("Libros encontrados");
  console.log("------------------");
  array.forEach((book) => {
    console.log(`ISBN: ${book.isbn}`);
    console.log(`Título: ${book.title}`);
    console.log(`Autor: ${book.author}`);
    console.log(`Categoría: ${book.category}`);
    console.log(`Editorial: ${book.editorial}`);
    console.log(`Páginas: ${book.pages}`);
    console.log("-----------------------");
  });
  console.log(`Cantidad: ${array.length}`);
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
  //usando splice
  const index = books.findIndex((book) => {
    return book.isbn === isbn;
  });

  if (index > -1) {
    let validar = confirm(`Desea eliminar el libro ${books[index].title}?`);
    if (validar) {
      books.splice(index, 1);
      alert("Libro eliminado");
    }
  } else {
    alert("Libro no encontrado");
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
