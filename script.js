console.log('I am connected :)');
// Burger menus
document.addEventListener('DOMContentLoaded', function () {
  // open
  const burger = document.querySelectorAll('.navbar-burger');
  const menu = document.querySelectorAll('.navbar-menu');

  if (burger.length && menu.length) {
    for (var i = 0; i < burger.length; i++) {
      burger[i].addEventListener('click', function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle('hidden');
        }
      });
    }
  }

  // close
  const close = document.querySelectorAll('.navbar-close');
  const backdrop = document.querySelectorAll('.navbar-backdrop');

  if (close.length) {
    for (var i = 0; i < close.length; i++) {
      close[i].addEventListener('click', function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle('hidden');
        }
      });
    }
  }

  if (backdrop.length) {
    for (var i = 0; i < backdrop.length; i++) {
      backdrop[i].addEventListener('click', function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle('hidden');
        }
      });
    }
  }
});






//Code for API calls to AudioDB
//Add an event listener to the Search Track button
document.getElementById("searchButton").addEventListener("click", searchArtist);

//Function to search for an artist
function searchArtist() {
  const artistName = document.getElementById("audioDbSearch").value;
  const apiKey = '523532';
  
  //url endpoint from audioDB documentation
  const apiUrl = `https://www.theaudiodb.com/api/v1/json/${apiKey}/search.php?s=${artistName}`;

  //Make the API request and handle the response
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayArtistInfo(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Function to display artist information
function displayArtistInfo(data) {
  console.log(data)
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (data && data.artists) {
    //grabs first result
    const artist = data.artists[0];

    // Display the artist's information
    resultsDiv.innerHTML = `
      <h2>Artist: ${artist.strArtist}</h2>
      <p>Genre: ${artist.strGenre}</p>
      <p>Biography: ${artist.strBiographyEN}</p>
    `;
  } else {
    resultsDiv.innerHTML = "No results found for the artist.";
  }
}
