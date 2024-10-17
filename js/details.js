const detailsDiv = document.getElementById("details-container");


// DISPLAY LOADER
function displayLoading() {
        let shimmerContent = `<div class="details-shimmer">
                                <div style="padding: 10px;">
                                    <box class="shine shine-details"></box>
                                </div>
    
                                <div class="shimmer-line-div" style="margin: 5px;">
                                    <lines class="shine"></lines>
                                    <lines class="shine"></lines>
                                    <lines class="shine"></lines>
                                    <photo class="shine"></photo>
                                </div>
                             </div>`
    
        const divEl = document.createElement("div");
        divEl.innerHTML = shimmerContent;
        detailsDiv.appendChild(divEl);
    }



document.addEventListener("DOMContentLoaded", function () {
  const bookId = localStorage.getItem("selectedBookId");
  if (bookId) {
    fetchBookDetails(bookId);
  } else {
    console.error("No book ID found.");
  }
});


// API CALL FOR BOOK DETAILS
function fetchBookDetails(id) {
  displayLoading();
  fetch(`https://gutendex.com/books/?ids=${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      displayBookDetails(data);
    })
    .catch((error) => console.error("Fetch error:", error));
}

function displayBookDetails(data) {
  const book = data.results[0];

  if (book) {
    const authorName =
      book.authors.length > 0 ? book.authors[0].name : "Unknown Author";

    const bookDetails = `
    <div class="img-div-details">
            <img  class="details-img" src="${book.formats["image/jpeg"]}" alt="Book Image">
    </div>


    <div class="detailsDiv">
        <h3>${book.title}</h3>
        <p class:"text-black">Author: <span class="author-name">${authorName}</span></p>
        <p ><span class:"text-black">Category: </span>${book?.subjects[3]}</p>
        <p><span class:"text-black">Downloaded: </span>${book.download_count}</p>
        <button onclick="window.open('${book?.formats?.["text/html"]}', '_blank')" class="read-btn">Want to read</button>
    </div>
            `;

    detailsDiv.innerHTML = bookDetails;
  } else {
    detailsDiv.innerHTML = "<p>No book details available.</p>";
  }
}
