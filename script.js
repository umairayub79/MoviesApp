const moviesContainer = document.getElementById("movies-container");
const URL = "https://yts.mx/api/v2/list_movies.json?limit=50";
let page = 1;
const observer = window.lozad();
observer.observe();

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (let index = 0; index < 50; index++) {
        const item = {
          id: data.data.movies[index].id,
          title: data.data.movies[index].title,
          url: data.data.movies[index].url,
          rating: data.data.movies[index].rating,
          year: data.data.movies[index].year,
          cover: data.data.movies[index].medium_cover_image,
          links: data.data.movies[index].torrents
        };
        createMovieView(item)
      }
      
    });
    if(page < 3){
      getMovies(url + `&page=${page += 1}`);
    }
}

getMovies(URL + `&page=${page}`);


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
      const downloadButton = document.createElement('a');
      downloadButton.href = movie.links[index].url;
      downloadButton.innerText = `Torrent ${movie.links[index].quality}`;

      movieView.appendChild(downloadButton);
      
  }
  moviesContainer.appendChild(movieView);
}
