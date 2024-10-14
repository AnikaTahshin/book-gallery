const wishStoreGet = JSON.parse(localStorage.getItem("wishlist")) || [];
const detailsDiv = document.getElementById("details-container");


// console.log("getting list",wishStoreGet)
document.addEventListener("DOMContentLoaded", function () {
    const wishDiv = document.getElementById("wish-container");

    // console.log("check wishlist", wishStoreGet);

    if (wishStoreGet.length === 0) {
        wishDiv.innerHTML = "<p>Your wishlist is empty.</p>";
    } else {
        wishStoreGet.forEach((book,index) => {
            const authorName = book.authors.length > 0 ? book.authors[0].name : "Unknown Author";
            // console.log("id to show",book.id)
            const res = 
                `<div class="card">

              <a href="../html/bookDetails.html"  onclick="bookDetails(${book.id})">
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

function bookDetails(id) {
    const x =localStorage.setItem("selectedBookId", JSON.stringify(id));
console.log("hello id new",x)
    // const options = {
    //     method: "GET",
    //   };
    // fetch(`https://gutendex.com/books/?ids=${id}`, options)
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   return response.json();
    // })
    // .then((data) => {

    //     console.log("hello single book",data)
    // //   dataStore = data?.results;
      
    // //   displayBooks(dataStore); 
    // })
    // .catch((error) => console.error("Fetch error:", error));
    
   
}