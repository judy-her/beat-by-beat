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






//Add an event listener to the Search Artist button
        document.getElementById("searchButton").addEventListener("click", searchArtist);

        //Add a keydown event listener to the input field
        document.getElementById("audioDbSearch").addEventListener("keydown", function(event) {
            // Check if the pressed key is Enter
            if (event.key === "Enter") {
                searchArtist();
            }
        });

        //Function to search for an artist
        function searchArtist() {
            const artistName = document.getElementById("audioDbSearch").value;
            const apiKey = '523532'; // Replace with your actual API key

            //URL endpoint from AudioDB documentation
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
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";

            if (data && data.artists) {
                const artist = data.artists[0];

                //Create an HTML template with the desired properties
                const artistInfoHTML = `
                    <p><strong>Artist:</strong> ${artist.strArtist}</p>
                    <p><strong>Birth Year:</strong> ${artist.intBornYear}</p>
                    <p><strong>Gender:</strong> ${artist.strGender}</p>
                    <p><strong>Country:</strong> ${artist.strCountry}</p>
                    <p><strong>Genre:</strong> ${artist.strGenre}</p>
                    <p><strong>Label:</strong> ${artist.strLabel}</p>
                    <p><strong>Mood:</strong> ${artist.strMood}</p>
                    <p><strong>Style:</strong> ${artist.strStyle}</p>
                    <p><strong>Website:</strong> <a href="${artist.strWebsite}" target="_blank">${artist.strWebsite}</a></p>
                    <p><strong>Biography:</strong><br>${artist.strBiographyEN}</p>
                `;

                //Append the HTML to the resultsDiv
                resultsDiv.innerHTML = artistInfoHTML;

            } else {
                resultsDiv.innerHTML = "No results found for the artist.";
            }
        }



