
let cardDiv = document.getElementById("app-container");

// function searchData(data) {
    // Store the filtered data
    const filterData = localStorage.getItem("dataItem");

    console.log("hello",filterData)
  
    cardDiv.innerHTML = "";
  
    filterData?.forEach((book, index) => {
      const authorName =
        book.authors.length > 0 ? book.authors[0].name : "Unknown Author";
  
      const res = `
          <div class="card">
  
            <img class="card-img" src=${book.formats["image/jpeg"]} alt="">
                       <div class="home-desc">
  
            <p>${book.id}</p>
            <p>${book.title}</p>
            <p class="author">Author: ${authorName}</p>
  
            </div>
              <div class="btn-div">
          </div>
          </div>
  
        `;
  
      cardDiv.insertAdjacentHTML("beforeend", res);
    });
//   }