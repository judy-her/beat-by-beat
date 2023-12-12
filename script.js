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




// Add an event listener to the Search Artist button
document.getElementById("searchButton").addEventListener("click", searchArtist);

// Add a keydown event listener to the input field
document.getElementById("audioDbSearch").addEventListener("keydown", function(event) {
    // Check if the pressed key is Enter
    if (event.key === "Enter") {
        searchArtist();
    }
});

// Your API key for theaudiodb.com
const apiKey = '523532';

// Function to search for an artist
function searchArtist() {
    const artistName = document.getElementById("audioDbSearch").value;

    // URL endpoint for artist search on theaudiodb.com
    const apiUrl = `https://www.theaudiodb.com/api/v1/json/${apiKey}/search.php?s=${artistName}`;

    // Make the API request and handle the response
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayArtistInfo(data);
            fetchMusicVideos(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// Function to display artist information
function displayArtistInfo(data) {
    console.log(data)
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (data && data.artists) {
        const artist = data.artists[0];

        // Create an HTML template with the desired properties
        const artistInfoHTML = `
            <p><strong>Artist:</strong> ${artist.strArtist}</p>
            <p><strong>Birth Year:</strong> ${artist.intBornYear}</p>
            <p><strong>Gender:</strong> ${artist.strGender}</p>
            <p><strong>Country:</strong> ${artist.strCountry}</p>
            <p><strong>Genre:</strong> ${artist.strGenre}</p>
            <p><strong>Label:</strong> ${artist.strLabel}</p>
            <p><strong>Website:</strong> <a href="${artist.strWebsite}" target="_blank">${artist.strWebsite}</a></p>
            <p><strong>Biography:</strong><br>${artist.strBiographyEN}</p>
        `;

        // Append the HTML to the resultsDiv
        resultsDiv.innerHTML = artistInfoHTML;
    } else {
        resultsDiv.innerHTML = "No results found for the artist.";
    }
}

// Function to fetch music videos
function fetchMusicVideos(data) {
    if (data && data.artists) {
        const artistId = data.artists[0].idArtist;

        // URL endpoint for fetching music videos using the TADB_Artist_ID
        const apiUrl = `https://www.theaudiodb.com/api/v1/json/${apiKey}/mvid.php?i=${artistId}`;

        // Make the API request and handle the response
        fetch(apiUrl)
            .then((response) => response.json())
            .then((musicVideosData) => {
                displayMusicVideos(musicVideosData);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
}

// Function to display music videos as links with each title on a new line, along with the corresponding thumbnail
function displayMusicVideos(musicVideosData) {
  console.log(musicVideosData);
  const videosDiv = document.getElementById("videos");
  // videosDiv.innerHTML = "";

  if (musicVideosData.mvids) {
      const musicVideos = musicVideosData.mvids;

      musicVideos.forEach((video) => {
          // Extract the YouTube video ID from the URL
          const videoId = getYouTubeVideoId(video.strMusicVid);

          if (videoId) {
              const videoLink = document.createElement('a');
              videoLink.href = `https://www.youtube.com/watch?v=${videoId}`;
              videoLink.target = "_blank"; // Open the link in a new tab
              videoLink.textContent = `${video.strTrack}`;
              videosDiv.appendChild(videoLink);

              // Create an image element for the thumbnail
              const thumbnail = document.createElement('img');
              thumbnail.src = video.strTrackThumb;
              thumbnail.alt = `${video.strTrack} Thumbnail`;
              videosDiv.appendChild(thumbnail);

              // Add a line break to separate each video
              videosDiv.appendChild(document.createElement('br'));
          }
      });
  } else {
      console.log('No music videos found for this artist.');
  }
}

// Function to make Carousel interactive
const carouselElement = document.getElementById('carousel-example');

const items = [
    {
        position: 0,
        el: document.getElementById('carousel-item-1'),
    },
    {
        position: 1,
        el: document.getElementById('carousel-item-2'),
    },
    {
        position: 2,
        el: document.getElementById('carousel-item-3'),
    },
    {
        position: 3,
        el: document.getElementById('carousel-item-4'),
    },
];

// options with default values
const options = {
    defaultPosition: 1,
    interval: 3000,

    indicators: {
        activeClasses: 'bg-white dark:bg-gray-800',
        inactiveClasses:
            'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
        items: [
            {
                position: 0,
                el: document.getElementById('carousel-indicator-1'),
            },
            {
                position: 1,
                el: document.getElementById('carousel-indicator-2'),
            },
            {
                position: 2,
                el: document.getElementById('carousel-indicator-3'),
            },
            {
                position: 3,
                el: document.getElementById('carousel-indicator-4'),
            },
        ],
    },

    // callback functions
    onNext: () => {
        console.log('next slider item is shown');
    },
    onPrev: () => {
        console.log('previous slider item is shown');
    },
    onChange: () => {
        console.log('new slider item has been shown');
    },
};

// instance options object
const instanceOptions = {
  id: 'carousel-example',
  override: true
};


// Function to extract YouTube video ID from a URL
function getYouTubeVideoId(url) {
  const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}
