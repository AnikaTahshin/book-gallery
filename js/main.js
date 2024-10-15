let cardDiv = document.getElementById("app-container");
let input = document.getElementById("search-input");
let wishDiv = document.getElementById("wish-container");
let dropdownDiv = document.getElementById('dropdown-content')
let category = []
let dataStore = [];
let wishStore = JSON.parse(localStorage.getItem("wishlist")) || [];

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
  const options = {
    method: "GET",
  };

  displayLoading()

  fetch("https://gutendex.com/books/", options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      
        hideLoading()
        dataStore = data?.results;
      dataStore?.map((item) => {
        // category.push(item?.bookshelves[0])
        if (item?.bookshelves) {
        dropdownCategory(item?.bookshelves[0])
          
        }
        
        // console.log("cat",item?.bookshelves[0])
      })
      displayBooks(dataStore);
      
       
    })
    .catch((error) => console.error("Fetch error:", error));

  input.addEventListener("keyup", function (e) {
    const currentWord = e.target.value.toLowerCase(); 
    const filteredData = dataStore.filter((o) =>
      o.title.toLowerCase().includes(currentWord)
    );

    cardDiv.innerHTML = "";

    if (currentWord) {
      filteredData.length
        ? displayBooks(filteredData)
        : (cardDiv.innerHTML = noResultHTML());
    } else {
      displayBooks(dataStore); 
    }
  });
});


function dropdownCategory(category) {
  const res = `
              <a id="drop-item" href="#">${category}</a>

  `
  dropdownDiv.insertAdjacentHTML("beforeend", res);
}
function displayBooks(books) {
  cardDiv.innerHTML = "";

  books?.forEach((book, index) => {
    const authorName =
      book.authors.length > 0 ? book.authors[0].name : "Unknown Author";
      const isLiked = wishStore.some((wishBook) => wishBook.id === book.id);
      const heartIconClass = isLiked ? "fa-solid" : "fa-regular";
  
      const res = `
          <div class="card">
              <i onclick="toggleLike(${index})" class="${heartIconClass} fa-heart" id="heart-icon-${index}"></i>
  
            <img class="card-img" src=${book.formats["image/jpeg"]} alt="">
            <p>${book.id}</p>
            <p>${book.title}</p>
            <p class="author">Author: ${authorName}</p>
          </div>
        `;

    cardDiv.insertAdjacentHTML("beforeend", res);
  });
}


function toggleLike(index) {
  const heartIcon = document.getElementById(`heart-icon-${index}`);
  const tempArr = dataStore[index];

  if (heartIcon.classList.contains("fa-regular")) {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid");

    wishStore.push(tempArr);
    dataStore.push(tempArr);

  } else {
    heartIcon.classList.remove("fa-solid");
    heartIcon.classList.add("fa-regular");

    wishStore = wishStore.filter((book) => book.id !== tempArr.id);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishStore));
}


