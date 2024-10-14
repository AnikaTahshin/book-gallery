const wishStoreGet = JSON.parse(localStorage.getItem("wishlist")) || [];
const detailsDiv = document.getElementById("details-container");


console.log("getting list",wishStoreGet)
document.addEventListener("DOMContentLoaded", function () {
    const wishDiv = document.getElementById("wish-container");

    console.log("check wishlist", wishStoreGet);

    if (wishStoreGet.length === 0) {
        wishDiv.innerHTML = "<p>Your wishlist is empty.</p>";
    } else {
        wishStoreGet.forEach((book,index) => {
            const authorName = book.authors.length > 0 ? book.authors[0].name : "Unknown Author";
            
            const res = 
                `<div class="card">

              <a href="../html/bookDetails.html" onclick="bookDetails()">
                    <img class="card-img" src="${book.formats["image/jpeg"]}" alt="Book Image">
                    <p>${book.id}</p>
                    <p>${book.title}</p>
                    <p class="author">Author: ${authorName}</p>
              </a>
                </div>`

            ;

            wishDiv.insertAdjacentHTML("beforeend", res);
        });
    }
});

function bookDetails() {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("id");

    if (bookId) {
        const selectedBook = wishStoreGet.find((book) => book.id === bookId);

        if (selectedBook) {
            const authorName = selectedBook.authors.length > 0 ? selectedBook.authors[0].name : "Unknown Author";
            const detailsHTML = `
                <div class="card">
                    <img class="card-img" src="${selectedBook.formats["image/jpeg"]}" alt="Book Image">
                    <p>${selectedBook.id}</p>
                    <p>${selectedBook.title}</p>
                    <p class="author">Author: ${authorName}</p>
                </div>
            `;

            detailsDiv.innerHTML = detailsHTML;
        } else {
            detailsDiv.innerHTML = "<p>Book not found.</p>";
        }
    } else {
        detailsDiv.innerHTML = "<p>No book ID provided.</p>";
    }
    // const detailsDiv=document.getElementById('details-container')
    // wishStoreGet.find((item) => item.id == id){

    //     const data = 
    //     `<div class="card">
    
    //               <a href="../html/bookDetails.html" onclick="bookDetails(${book})">
    //                     <img class="card-img" src="${book.formats["image/jpeg"]}" alt="Book Image">
    //                     <p>${book.id}</p>
    //                     <p>${book.title}</p>
    //                     <p class="author">Author: ${authorName}</p>
    //               </a>
    //                 </div>`
                    
    // }
    // detailsDiv.innerHTML(data)
}