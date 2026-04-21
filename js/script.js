const global = {
  currentPage: window.location.pathname,
};

async function fetchAPIdata(endpoint) {
  const API_KEY = "79c5db1ca55c3a57ce5599557b72ec10";
  const API_URL = "https://api.themoviedb.org/3/";

  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en_US`,
  );

  const data = await response.json();
  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

const displayPopularMovies = async () => {
  const { results } = await fetchAPIdata("movie/popular");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");

    console.log(movie);

    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path
              ? ` <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt=${movie.title}
            />`
              : ` <img
              src= "../images/no-image.jpg"
              class="card-img-top"
              alt=${movie.title}
            />`
          }   
         
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;

    document.querySelector("#popular-movies").appendChild(div);
  });
};

const displayPopularShows = async () => {
  const { results } = await fetchAPIdata("tv/popular");

  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");

    console.log(show);

    div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
          ${
            show.poster_path
              ? ` <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt=${show.name}
            />`
              : ` <img
              src= "../images/no-image.jpg"
              class="card-img-top"
              alt=${show.name}
            />`
          }   
         
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${show.first_air_date}</small>
            </p>
          </div>
        `;

    document.querySelector("#popular-shows").appendChild(div);
  });
};

async function displayMovieDetails() {
  const queryParam = window.location.search;
  const movieId = queryParam.split("=")[1];

  const movie = await fetchAPIdata(`movie/${movieId}`);

  displayBackgroundImage("movie", movie.backdrop_path);

  console.log(movie);
  const div = document.createElement("div");

  div.innerHTML = `<div class="details-top">
          <div>
            ${
              movie.poster_path
                ? ` <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt=${movie.title}
            />`
                : ` <img
              src= "../images/no-image.jpg"
              class="card-img-top"
              alt=${movie.title}
            />`
            }   
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${movie.production_companies.map((item) => `<span>${item.name}</span>`).join(", ")}
          </div>
        </div>`;

  document.querySelector("#movie-details").appendChild(div);
}

async function displayShowDetails() {
  const queryParam = window.location.search;
  const showId = queryParam.split("=")[1];

  const show = await fetchAPIdata(`tv/${showId}`);

  displayBackgroundImage("show", show.backdrop_path);

  console.log(show);
  const div = document.createElement("div");

  div.innerHTML = `<div class="details-top">
          <div>
            ${
              show.poster_path
                ? ` <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt=${show.name}
            />`
                : ` <img
              src= "../images/no-image.jpg"
              class="card-img-top"
              alt=${show.name}
            />`
            }   
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>show Info</h2>
          <ul>
            <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
            <li><span class="text-secondary">Last Epsiode to Air:</span> ${show.last_episode_to_air.name}</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${show.production_companies.map((item) => `<span>${item.name}</span>`).join(", ")}
          </div>
        </div>`;

  document.querySelector("#show-details").appendChild(div);
}

async function displayBackgroundImage(type, backdropPath) {
  const overlayDiv = document.createElement("div");

  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdropPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.1";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/shows.html":
      displayPopularShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayShowDetails();
      break;
    case "/search.html":
      console.log("Search");
      break;
  }

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
