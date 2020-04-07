const moviesContainer = document.getElementById("movies-container");
const URL = "https://yts.mx/api/v2/list_movies.json";
const SearchForm = document.getElementById("search-form");
const SearchInput = document.getElementById("search-input");
let page = 1;
const observer = window.lozad();
observer.observe();

$("#container").pagination({
  alias: {
    pageNumber: "page",
    pageSize: "limit",
  },
  dataSource: URL,
  locator: "data.movies",
  pageSize: 20,
  totalNumber: 16140,
  pageNumber: 1,
  ajax: {
    beforeSend: function () {
      $("#movies-container").html(`<div class="loading">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
  </div>`);
    },
  },
  callback: function (data, pagination) {
    $("#movies-container").html("");
    getMovies(data);
  },
});

function getMovies(items) {
  for (let index = 0; items.length; index++) {
    const item = {
      id: items[index].id,
      title: items[index].title,
      url: items[index].url,
      rating: items[index].rating,
      year: items[index].year,
      cover: items[index].medium_cover_image,
      links: items[index].torrents,
    };
    createMovieView(item);
  }
}

function searchMovie(term){
    fetch(URL + `?query_term=${term}`)
      .then((res) => res.json())
      .then((data) => {
        const movie_count = data.data.movie_count;
        const movies = data.data.movies;
        if(movie_count < 1){
          moviesContainer.innerHTML = `<h4>${movie_count} Results found!</h4>`;
        }else{
          moviesContainer.innerHTML = "";
          getMovies(movies);
        }
        
      });

}
function createMovieView(movie) {
  const movieView = document.createElement("div");
  movieView.classList.add("movie");
  movieView.classList.add("lozad");

  const movieCover = document.createElement("img");
  movieCover.classList.add("movieCover");
  movieCover.classList.add("lozad");
  movieCover.src = movie.cover;

  const movieTitle = document.createElement("h3");
  movieTitle.classList.add("movieTitle");
  movieTitle.innerText = movie.title;

  const movieInfo = document.createElement("div");
  movieInfo.classList.add("movieInfo");

  const movieYear = document.createElement("p");
  movieYear.classList.add("movieYear");
  movieYear.innerText = `Year ${movie.year}`;

  const movieRating = document.createElement("p");
  movieRating.classList.add("movieRating");
  movieRating.innerText = `Rating ${movie.rating} `;

  movieInfo.appendChild(movieYear);
  movieInfo.appendChild(movieRating);

  movieView.appendChild(movieCover);
  movieView.appendChild(movieTitle);
  movieView.appendChild(movieInfo);

  for (let index = 0; index < movie.links.length; index++) {
    const downloadButton = document.createElement("a");
    downloadButton.href = movie.links[index].url;
    downloadButton.innerText = `Torrent ${movie.links[index].quality}`;

    movieView.appendChild(downloadButton);
  }
  moviesContainer.appendChild(movieView);
}

SearchForm.addEventListener('submit', e =>{
  e.preventDefault();
  if(SearchInput.value != ""){
    searchMovie(SearchInput.value);
  }
});