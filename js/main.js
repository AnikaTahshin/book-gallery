let cardDiv = document.getElementById("app-container");
let input = document.getElementById("search-input");
let dataStore = [];

document.addEventListener("DOMContentLoaded", function () {


  const options = {
    method: "GET",
  };

  fetch("https://gutendex.com/books/", options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Log the whole response to see its structure
      dataStore = data?.results;
      displayBooks(dataStore); // Display all books initially
    })
    .catch((error) => console.error("Fetch error:", error));

  // Event listener for search input
  input.addEventListener("keyup", function (e) {
    const currentWord = e.target.value.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    const filteredData = dataStore.filter((o) =>
      o.title.toLowerCase().includes(currentWord)
    );

    // Clear previous results
    cardDiv.innerHTML = "";

    // If the input is empty, show all books; otherwise, show filtered results
    if (currentWord) {
      filteredData.length ? displayBooks(filteredData) : cardDiv.innerHTML = noResultHTML();
    } else {
      displayBooks(dataStore); // Show all books if input is empty
    }
  });
});

function displayBooks(books) {
  // Clear the container before appending new books
  cardDiv.innerHTML = "";
  
  books?.forEach((book) => {
    const authorName =
      book.authors.length > 0 ? book.authors[0].name : "Unknown Author";

    const res = `
        <div class="card">
          <img class="card-img" src=${book.formats['image/jpeg']} alt="">
          <p>${book.id}</p>
          <p>${book.title}</p>
          <p class="author">Author: ${authorName}</p>
        </div>
      `;

    // Use insertAdjacentHTML to append the HTML as a string
    cardDiv.insertAdjacentHTML("beforeend", res);
  });
}

function noResultHTML() {
  return `<div class="pieceofdata">
    <h1 class="symbol"></h1>
    <h1 class="name"></h1>
    <h1 class="name">No Results Found</h1>
    <h1 class="price"></h1>
  </div>`;
}
