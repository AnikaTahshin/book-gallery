// const detailsDiv = document.getElementById("details-container");
// const id = JSON.parse(localStorage.getItem("selectedBookId"));
// loading on api response
const loader = document.querySelector("#loading");


// showing loading
function displayLoading() {
  loader.classList.add("display");
  // to stop loading after some time
  
}

// hiding loading 
function hideLoading() {
  loader.classList.remove("display");
}
document.addEventListener("DOMContentLoaded", function () {
    const bookId = localStorage.getItem("selectedBookId");
    console.log('hello id',bookId)

    if (bookId) {
        fetchBookDetails(bookId);
    } else {
        console.error("No book ID found.");
    }
});

function fetchBookDetails(id) {
    displayLoading()
    fetch(`https://gutendex.com/books/?ids=${id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            hideLoading()
            console.log("Book details:", data);
            // Display the book details on the page
            displayBookDetails(data);
        })
        .catch((error) => console.error("Fetch error:", error));
}

function displayBookDetails(data) {
    const detailsDiv = document.getElementById("details-container");
    const book = data.results[0]; // Assuming the API returns the book in results array

    if (book) {
        const authorName = book.authors.length > 0 ? book.authors[0].name : "Unknown Author";

        const bookDetails = `
            <h1>${book.title}</h1>
            <img src="${book.formats['image/jpeg']}" alt="Book Image">
            <p>Author: ${authorName}</p>
            <p>${book.description || "No description available."}</p>
        `;

        detailsDiv.innerHTML = bookDetails;
    } else {
        detailsDiv.innerHTML = "<p>No book details available.</p>";
    }
}
