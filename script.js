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
// Add an event listener to the Search Track button
document.getElementById("searchButton").addEventListener("click", searchTrack);

// Add a keydown event listener to the input field
document.getElementById("audioDbSearch").addEventListener("keydown", function (event) {
  // Check if the pressed key is Enter
  if (event.key === "Enter") {
    searchTrack();
  }
});

// Function to search for a track
function searchTrack() {
  const artistName = document.getElementById("audioDbSearch").value;
  const singleName = document.getElementById("singleNameInput").value; // Add an input field for the track name
  const apiKey = '523532'; // Replace with your actual API key

  // URL endpoint from AudioDB documentation for searching tracks by artist and track name
  const apiUrl = `https://www.theaudiodb.com/api/v1/json/${apiKey}/searchtrack.php?s=${artistName}&t=${singleName}`;

  // Make the API request and handle the response
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayTrackInfo(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to display track information
function displayTrackInfo(data) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (data && data.track) {
    const track = data.track[0]; // Assuming you want the first result

    // Create an HTML template with the desired track properties
    const trackInfoHTML = `
      <p><strong>Artist:</strong> ${track.strArtist}</p>
      <p><strong>Track Name:</strong> ${track.strTrack}</p>
      <p><strong>Genre:</strong> ${track.strGenre}</p>
      <p><strong>Album:</strong> ${track.strAlbum}</p>
      <p><strong>Release Date:</strong> ${track.strReleaseDate}</p>
      <p><strong>Track Description:</strong><br>${track.strDescriptionEN}</p>
    `;

    // Append the HTML to the resultsDiv
    resultsDiv.innerHTML = trackInfoHTML;
  } else {
    resultsDiv.innerHTML = "No results found for the track.";
  }
}

