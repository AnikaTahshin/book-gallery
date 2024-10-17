const wishStoreGet = JSON.parse(localStorage.getItem("wishlist")) || [];
const detailsDiv = document.getElementById("details-container");


document.addEventListener("DOMContentLoaded", function () {
    const wishDiv = document.getElementById("wish-container");

    if (wishStoreGet.length === 0) {
        wishDiv.innerHTML = "<p>Your wishlist is empty.</p>";
    } else {
        wishStoreGet.forEach((book,index) => {
            const authorName = book.authors.length > 0 ? book.authors[0].name : "Unknown Author";
            const res = 
                `<div class="card">

                    <img class="card-img" src="${book.formats["image/jpeg"]}" alt="Book Image">
           <div class="home-desc">

                    <p>${book.id}</p>
                    <p>${book.title}</p>
                    <p class="author">Author: ${authorName}</p>
            </div>

              <div class="btn-div">
          <button onclick="goToBookDetails(${book.id})" class="details-btn">View Details</button>
        </div>
                </div>`

            ;

            wishDiv.insertAdjacentHTML("beforeend", res);
        });
    }
});

// BOOK DETAILS PAGE
function goToBookDetails(bookId) {

    console.log("going...")
    localStorage.setItem("selectedBookId",bookId);
     window.location.href = `../html/bookDetails.html`;
  }

function bookDetails(id) {
    const x =localStorage.setItem("selectedBookId", JSON.stringify(id));   
}