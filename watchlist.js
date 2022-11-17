const searchResults = document.getElementById('search-results');
const watchlistMsg = document.getElementById('watchlist-msg');
const addMovies = document.getElementById('add-movies');
const wlButton = document.getElementById('wl-button');

wlButton.addEventListener('click', goSearch);

function goSearch() {
    window.location='index.html';
}

let movies = [
    {
        Poster : 'https://m.media-amazon.com/images/M/MV5BMTY0MjEyODQzMF5BMl5BanBnXkFtZTcwMTczMjQ4Mg@@._V1_SX300.jpg',
        Title : '2012',
        Rating: '5.8',
        Runtime : '158 min',
        Genre : 'Action, Adventure, Sci-Fi',
        Plot : 'A frustrated writer struggles to keep his family alive when a series of global catastrophes threatens to annihilate mankind.'
    }
];
let movie_index = 0 ;

//let mlist = JSON.parse(localStorage.getItem("Currentlist") || "[]");
movies = JSON.parse(localStorage.getItem("Watchlist") || "[]");


let html_str = '';
// set background image to nothing
searchResults.style.backgroundImage = 'none';
searchResults.style.opacity = 1 ;

html_str = `<button id='delete-btn' class='delete-btn'>Delete Watchlist</button>`;

for(let i = 0; i < movies.length; i++) {

    html_str += `
            <div class='current-movie'>
                <div class='poster'>
                    <img src = ${movies[i].Poster} alt='movie img'>
                </div>
                <div class='movie-info-wrapper'>
                    <div class='movie-info'>
                        <p class='title'>${movies[i].Title}</p>
                        <img class='rating-star' src='./images/ratingStar2.png'>
                        <p class='movie-rating'>${movies[i].Rating}</p>
                    </div>
                    <div class='movie-genre'>
                        <p>${movies[i].Runtime} </p>
                        <p>${movies[i].Genre} </p>
                    </div>
                    <div class="movie-plot">
                        <p>${movies[i].Plot}</p>
                    </div>
                </div>
            </div>`

            console.log('html_str length : ' + html_str.length);
            
            searchResults.innerHTML = html_str;
}

if(movies.length > 0) {
    const deleteBtn = document.getElementById('delete-btn');

    deleteBtn.addEventListener('click', function() {
        localStorage.removeItem("Watchlist");
        location.reload();
    });
}
