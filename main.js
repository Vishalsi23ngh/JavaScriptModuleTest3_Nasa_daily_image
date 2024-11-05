const baseUrl = "https://api.nasa.gov/planetary/apod";

const api_key = "NGQF6lUl5IIi06xnNSD4m6DWY1gqOgQBN1thqx5w";
let date = new Date().toISOString().split("T")[0];
let url = baseUrl + `?date=${date}&api_key=${api_key}`;
console.log(url);
let arr = [];

// Function to get the current image of the day
async function getImageOfTheDay() {
    arr.push(date);
    const response = await fetch(url);
    const data = await response.json();

    // Update UI with fetched data
    updateUI(data);

    // Display search history after fetching data
    displaySearchHistory();
}
getImageOfTheDay();

// Function to update the UI with the fetched data
function updateUI(data) {
    const explanation = data.explanation;
    const para = document.getElementById("current-image-container");
    
    // Update explanation
    const val = para.querySelector("p");
    val.innerHTML = explanation;

    // Update title
    const title = data.title;
    const Title = para.querySelector("h2");
    Title.textContent = title;

    // Update image
    const img = data.url;
    const Img = para.querySelector("img");
    Img.src = img;

    // Update heading
    const heading = `Picture on ${date}`;
    const Heading = para.querySelector("h1");
    Heading.innerText = heading;
}

// Event listener for user-input date
let dateByuser = document.getElementById("search-input");
let btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    async function getCurrentImageOfTheDay() {
        if (dateByuser.value) {
            date = dateByuser.value;
            let url = baseUrl + `?date=${date}&api_key=${api_key}`;
            console.log(date);
            arr.push(date);
            const response = await fetch(url);
            const data = await response.json();
            
            // Update UI with fetched data
            updateUI(data);

            // Display search history after fetching data
            displaySearchHistory();
        } else {
            console.log("Please enter a valid date");
        }
    }
    getCurrentImageOfTheDay();
});

// Function to display search history
function displaySearchHistory() {
    const searchHistoryList = document.getElementById("search-history");

    // Clear previous list items
    searchHistoryList.innerHTML = "";

    // Add list items for each date
    arr.forEach(date => {
        const listItem = document.createElement("li");
        listItem.textContent = date;
        listItem.addEventListener("click", () => {
            // Fetch image for the clicked date from history
            dateByuser.value = date; // Set input to the clicked date
            getCurrentImageOfTheDay(); // Fetch the image for that date
        });
        searchHistoryList.appendChild(listItem);
    });
}
