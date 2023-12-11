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
function constructURL(endpoint, params) {
  const apiBase = 'https://www.theaudiodb.com/api/v1/json/2/';
  return `${apiBase}${endpoint}?${new URLSearchParams(params).toString()}`;
}

function searchTrack() {
  const artistName = document.getElementById('audioDbSearch').value;
  const trackName = document.getElementById('trackName').value;
  const url = constructURL('searchtrack.php', { s: artistName, t: trackName });

  fetchData(url);
}

//function searchMusicVideos() {
  //const artistId = document.getElementById('artistId').value;
  //const url = constructURL('mvid.php', { i: artistId });

  //fetchData(url);
//}

function fetchData(url) {
  fetch(url)
      .then(response => response.json())
      .then(data => {
          document.getElementById('results').innerHTML = JSON.stringify(data, null, 2);
      })
      .catch(error => {
          console.error('Error:', error);
          document.getElementById('results').textContent = 'Failed to fetch data';
      });
}
