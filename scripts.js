const movieIds = [
    'tt18925334', 'tt1745960', 'tt12593682', 'tt11866324', 'tt5884796',
    'tt10954984', 'tt7985704', 'tt8178634', 'tt6710474', 'tt1877830',
    'tt11138512', 'tt15679400', 'tt10640346', 'tt14444726', 'tt14208870',
    'tt3704428', 'tt11813216', 'tt13833688', 'tt13453006', 'tt10370710',
    'tt7322224', 'tt11466222', 'tt1489887', 'tt0151804'
];

const apiKey = '54a5d82b';
const serverUrl = 'http://paaskedudes.com';

$(document).ready(function () {
    const $movieList = $("#movie-list");
  
    $.getJSON(`${serverUrl}/get-ranking`, (data) => {
      data.forEach((movie) => {
        fetchAndDisplayMovie(movie.movie_id, $movieList);
      });
    });
  
    // Enable drag and drop functionality
    const drake = dragula([$movieList[0]]);
    drake.on("drop", () => {
      const currentOrder = $movieList
        .children()
        .map((_, el) => $(el).data("movie-id"))
        .get();
      $.post(`${serverUrl}/save-ranking`, currentOrder);
    });
  });
  
  function fetchAndDisplayMovie(movieId, $movieList) {
    const movieUrl = `https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`;
  
    $.getJSON(movieUrl, (data) => {
      const movieItem = `
        <li data-movie-id="${movieId}">
            <img src="${data.Poster}" alt="${data.Title}" />
            <div class="movie-info">
                <h3>${data.Title} (${data.Year})</h3>
                <p>${data.Plot}</p>
            </div>
        </li>
      `;
      $movieList.append(movieItem);
    });
  }