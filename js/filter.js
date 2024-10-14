document.addEventListener("DOMContentLoaded", function () {
    const cardDiv = document.getElementById("app-container");
    const input = document.getElementById("search-input");
    // let dataaa = document.querySelector(".app-container");
  
    // Change const to let so dataStore can be reassigned
    let dataStore = [];
  
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
      })
      .catch((error) => console.error("Fetch error:", error));
  
    // Helper function to generate HTML for filtered results
    function getHTML(data) {
      return data.map((filterData) => generateHTML(filterData)).join("");
    }
  
    function generateHTML(filterData) {
      return `
       <div class="card">
<img class="card-img" src=${filterData.formats["image/jpeg"]} alt="">

                          <p> ${filterData?.id}</p>

              <p>${filterData?.title}</p>
              <p class="author">Author: ${filterData?.authors[0]?.name}</p>
            </div>
      `;
    }
  
    function noResultHTML() {
      return `<div class="pieceofdata">
      
      <h1 class="symbol"></h1>
      <h1 class="name"></h1>
      <h1 class="name">No Results Found</h1><h1 class="price"></h1></div>`;
    }
  
    // Event listener for search input
    input.addEventListener("keyup", function (e) {
      const currentWord = e.target.value.toLowerCase(); // Convert to lowercase for case-insensitive comparison
      const filteredData = dataStore.filter((o) =>
        o.title.toLowerCase().includes(currentWord)
      );
  
      // Only display filtered results if there is input
      if (currentWord) {
        cardDiv.innerHTML = filteredData.length
          ? getHTML(filteredData)
          : noResultHTML();
      } else {
        cardDiv.innerHTML = ""; // Clear results if input is empty
      }
    });
  });
  