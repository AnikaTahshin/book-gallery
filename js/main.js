let cardDiv = document.getElementById("app-container");
let input = document.getElementById("search-input");
let wishDiv = document.getElementById("wish-container");

let dropdownDiv = document.getElementById("dropdown-content");
let category = [];
let dataStore = [];
let wishStore = JSON.parse(localStorage.getItem("wishlist")) || [];
const pagination = document.getElementsByClassName("pagination_section")[0];
let searchDataStore = [];

let row = 4;
let page = sessionStorage.getItem("page_num");

let current_page = page ? parseInt(page) : 1;

// showing shimmer effect on api response
function displayLoading() {
  for (let i = 0; i < 4; i++) {
    let shimmerContent = `<div id="${i}">
                            <div style="padding: 10px;">
                                <box class="shine"></box>
                            </div>

                            <div style="margin: 5px;">
                                <lines class="shine"></lines>
                                <lines class="shine"></lines>
                                <lines class="shine"></lines>
                                <photo class="shine"></photo>
                            </div>
                         </div>`

    const divEl = document.createElement("div");
    divEl.innerHTML = shimmerContent;
    cardDiv.appendChild(divEl);
}
 
}

// showing shimmer effect on api response ends



document.addEventListener("DOMContentLoaded", function () {
  const options = {
    method: "GET",
  };

  displayLoading();

  fetch("https://gutendex.com/books/", options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      dataStore = data?.results;
      localStorage.setItem("booklist", dataStore);

      let item_list = data?.results;

      displayBooks(item_list, row, current_page);

      setupPaginationButton(item_list, row, current_page);

      dataStore?.map((item) => {
        if (item?.subjects[3]) {
          dropdownCategory(item?.subjects[3]);
        }

      });
      displayBooks(dataStore, row, current_page);
      setupPaginationButton(item_list, row, current_page);
    })
    .catch((error) => console.error("Fetch error:", error));

  $(document).on("input", "#search-input", function () {
    searchValue = $(this).val().toLowerCase();
  });

  $(document).on("click", "#searchBtn", function () {
   

    if (searchValue.length > 0) {
      const filteredData = dataStore.filter((o) =>
        o.title.toLowerCase().includes(searchValue)
      );

      cardDiv.innerHTML = "";
      localStorage.setItem("dataItem", JSON.stringify(filteredData));


      
      filteredData.length > 0
        ? searchData(filteredData)
        : (cardDiv.innerHTML = noResultHTML());
    } else {
      displayBooks(dataStore, row, current_page);
    }
  });

});


function noResultHTML() {
  pagination.innerHTML = "";

  return `
      <div>
          <h3>No Data Found</h3>
          <p>Try adjusting your search criteria.</p>
      </div>
  `;
}
// pagination buttton starts

function setupPaginationButton(items, row_per_page, current_page) {
  pagination.innerHTML = "";

  let page_count = Math.ceil(items.length / row_per_page);

  for (let i = 1; i <= page_count; i++) {
    let btn = document.createElement("a");
    btn.innerHTML = i;
    btn.style.cursor = "pointer";
    btn.style.margin = "10px";

    if (current_page === i) {
      btn.classList.toggle("active");
    }

    btn.addEventListener("click", () => {
      current_page = i; 

      sessionStorage.setItem("page_num", current_page);

      const elements = document.querySelectorAll(".active");
      elements.forEach((element) => {
        element.classList.remove("active");
      });

      if (current_page === i) {
        btn.classList.toggle("active");
      }

      displayBooks(items, row_per_page, current_page);
    });
    pagination.appendChild(btn);
  }
}


// pagination buttton ends



// SEARCH BOOK STARTS
function searchData(data) {
  // Store the filtered data
  // localStorage.setItem("dataItem", JSON.stringify(data));
  pagination.innerHTML = "";

  cardDiv.innerHTML = "";

  data?.forEach((book, index) => {
    const authorName =
      book.authors.length > 0 ? book.authors[0].name : "Unknown Author";
    const isLiked = wishStore.some((wishBook) => wishBook.id === book.id);
    const heartIconClass = isLiked ? "fa-solid" : "fa-regular";

    const res = `
        <div class="card">
            <i onclick="toggleLike(${index})" class="${heartIconClass} fa-heart heart-icon" id="heart-icon-${index}"></i>

          <img class="card-img" src=${book.formats["image/jpeg"]} alt="">
          <div class="home-desc">

            <p>${book.id}</p>
            <p>${book.title}</p>
            <p class="author">Author: ${authorName}</p>
            <p class="author">Genre: ${book.subjects[3]}</p>
</div>
            <div class="btn-div">
          <button onclick="goToBookDetails(${book.id})" class="details-btn">View Details</button>
        </div>
        </div>

      `;

    cardDiv.insertAdjacentHTML("beforeend", res);
  });
}

// 
// SEARCH BOOK ENDS

// SHOW CATEGORY ON DROPDOWN
function dropdownCategory(category) {
  let x = $("#dropdown-content");
  let y = $(".drop-item");

  const res = `
    <a id="drop-item" href="#" data-category="${category}">${category}</a>
  `;

  x.append(res);

  $("#dropdown-content").on("click", "#drop-item", function (e) {
    e.preventDefault(); 

    let selectedCategory = $(this).data("category");
    let filteredData = dataStore.filter((item) => {
      return item?.subjects.includes(selectedCategory);
    });

    if (filteredData.length > 0) {
      displayBooksDrop(filteredData);
    } else {
      cardDiv.innerHTML = "<p>No books available in this category.</p>";
    }
  });
}


// DISPLAY THE BOOK ACCORDING TO CATEGORY FILTER

function displayBooksDrop(filteredData) {
  cardDiv.innerHTML = "";
  pagination.style.display="none"
  
  filteredData?.forEach((book, index) => {
    const authorName =
      book.authors.length > 0 ? book.authors[0].name : "Unknown Author";
    const isLiked = wishStore.some((wishBook) => wishBook.id === book.id);
    const heartIconClass = isLiked ? "fa-solid" : "fa-regular";

    const res = `
          <div class="card">
              <i onclick="toggleLike(${index})" class="${heartIconClass} fa-heart" id="heart-icon-${index}"></i>
  
            <img class="card-img" src=${book.formats["image/jpeg"]} alt="">
           <div class="home-desc">

            <p>${book.id}</p>
            <p>${book.title}</p>
            <p class="author">Author: ${authorName}</p>
            <p class="author">Genre: ${book.subjects[3]}</p>
</div>
            <div class="btn-div">
          <button onclick="goToBookDetails(${book.id})" class="details-btn">View Details</button>
        </div>

          </div>

        `;

    let card = document.createElement("div");
    card.className = "card-container";
    card.insertAdjacentHTML("beforeend", res);
    cardDiv.appendChild(card);
    
    return;
  });
}




// DISPLAY BOOK LIST
function displayBooks(books, row_per_page, page) {
  cardDiv.innerHTML = "";
  page--;
  let start = row_per_page * page;
  let end = start + row_per_page;
  let paginate_items = books.slice(start, end);

  paginate_items?.forEach((book, index) => {
    const authorName =
      book.authors.length > 0 ? book.authors[0].name : "Unknown Author";
    const isLiked = wishStore.some((wishBook) => wishBook.id === book.id);
    const heartIconClass = isLiked ? "fa-solid" : "fa-regular";

    const res = `
          <div class="card">
            <i onclick="toggleLike(${index})" class="${heartIconClass} fa-heart" id="heart-icon-${index}"></i>
  
          <img class="card-img" src=${book.formats["image/jpeg"]} alt="">
           <div class="home-desc">
            <p>${book.id}</p>
            <p class = "title-text">${book.title}</p>
            <p class="author">Author: ${authorName}</p>
            <p class="author">Genre: ${book.subjects[3]}</p>
           </div>
            
        <div class="btn-div">
          <button onclick="goToBookDetails(${book.id})" class="details-btn">View Details</button>
        </div>

        </div>        
        `;

    let card = document.createElement("div");
    card.className = "card-container";
    card.insertAdjacentHTML("beforeend",res);
    cardDiv.appendChild(card);
    return;
  });
}


// BOOK DETAILS PAGE
function goToBookDetails(bookId) {

  localStorage.setItem("selectedBookId",bookId);
   window.location.href = `../html/bookDetails.html`;
}


// ADD OR REMOVE LIKED BOOKS

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

// navbar

document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item a");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      e.preventDefault();

      navItems.forEach((navItem) => navItem.classList.remove("active"));
      this.classList.add("active");
    });
  });
});



