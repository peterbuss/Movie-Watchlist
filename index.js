const btn = document.getElementById("search-btn");
//const searchText = document.querySelector('#search-bar');
const searchResults = document.getElementById('search-results');
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const addBtn = document.querySelectorAll('#addBtn');
const apikey = '49326fba';
console.log("Test...");
/* let movies = [
    {
        Poster : '',
        Title : '',
        Rating: '',
        Runtime : '',
        Genre : '',
        Plot : ''
    }
]; */
let movies = [];
let movie_index = 0 ;

btn.addEventListener("click", getAPI);

/* local storage help from stackoverflow.com

To store the array, do what you're doing:
localStorage.setItem("users", JSON.stringify(users));

To get the array:
users = JSON.parse(localStorage.getItem("users") || "[]");

Note how that provides a default (empty array) if getItem returns null 
because we've never stored our users there.

To add a user to the array:

users.push({id: 1, foo: "bar"});


 */

function added(index) {
	console.log('added clicked, index nr. ' + index);
    let mlist = JSON.parse(localStorage.getItem("Currentlist") || "[]");
    let msel = mlist[index];
    console.log("###### selected for insertion " + msel);
    //console.log("***** retrieved from local storage: " + mlist.length);

    let wlist = JSON.parse(localStorage.getItem("Watchlist") || "[]");
    wlist.push(msel);
    let mins = JSON.stringify(wlist);
    localStorage.removeItem("Watchlist");
    localStorage.setItem("Watchlist", mins);

}

function getAPI(event) {
    //event.preventDefault();
    console.log("search text is: " + searchBar.value);

    let html_str = '';

    let url='http://www.omdbapi.com/?apikey=' + apikey + '&s=' + searchBar.value;
    console.log("fetch url is: " + url);
    searchBar.value = '';

    // set background image to nothing
    searchResults.style.backgroundImage = 'none';
    searchResults.style.opacity = 1 ;

    fetch(url) 
        .then(res => res.json())
        .then(data => { 
            console.log(data);
            console.log("data results: " + data.totalResults);
            console.log("Search: " + data.Search.length);

            let searchResults = document.getElementById('search-results');

            // console.log section - first fetch
            if(data.Search.length === 1) {
                console.log("Image linke: " + data.Poster);
                console.log("Title: " + data.Title);
                console.log("Runtime: " + data.Runtime);
                console.log("Genre: " + data.Genre);
                console.log("Plot: " + data.Plot);
            } else {
                for(let i = 0; i < data.Search.length; i++) {
                    console.log(data.Search[i].Poster);
                    console.log(data.Search[i].Title);
                    console.log(data.Search[i].Type);
                    console.log(data.Search[i].Year);
                } 
            
                let j=0;
                for(i = 0; i < data.Search.length; i++) {
                    // fetch movie data with id if movie


                    //if(data.Search[i].Type === 'movie') {  // data.Search[i].Type === 'movie'
                        url='http://www.omdbapi.com/?apikey=' + apikey + '&i=' + data.Search[i].imdbID;
                        console.log("inner fetch url: " + url);

                        fetch(url)
                            .then(res => res.json())
                            .then(movieData => { 
                                console.log(movieData)
                                console.log("Image link: " + movieData.Poster);
                                console.log("Title: " + movieData.Title);
                                console.log("Runtime: " + movieData.Runtime);
                                console.log("Genre: " + movieData.Genre);
                                console.log("Plot: " + movieData.Plot);
                                console.log("Rating: " + movieData.imdbRating);
                               

                                let ImagePoster = movieData.Poster;
                                if(ImagePoster==='N/A')
                                    ImagePoster = './images/placeholder-image.png';


                                
                                // update html_str
                                html_str += `
                                <div class='current-movie'>
                                    <div class='poster'>
                                        <img src = ${ImagePoster} alt='movie img'>
                                    </div>
                                    <div class='movie-info-wrapper'>
                                        <div class='movie-info'>
                                            <p class='title'>${movieData.Title}</p>
                                            <p class='movie-rating'>⭐${movieData.imdbRating}</p>
                                        </div>
                                        <div class='movie-genre'>
                                            <p>${movieData.Runtime} </p>
                                            <p>${movieData.Genre} </p>
                                            <div class='watchlist-btn flex-container'>
                                                <button id= 'addBtn' onclick="added(${j})">+</button>
                                                <p>Watchlist</p>
                                            </div>
                                        </div>
                                        <div class="movie-plot">
                                            <p>${movieData.Plot}</p>
                                        </div>
                                    </div>
                                </div>`

                                console.log('html_str length : ' + html_str.length);
                               
                                searchResults.innerHTML = html_str;
                                                      
                                movies.push({
                                    Poster: ImagePoster,
                                    Title: movieData.Title,
                                    Rating: movieData.imdbRating,
                                    Runtime: movieData.Runtime,
                                    Genre: movieData.Genre,
                                    Plot: movieData.Plot
                                });

                                console.log("******** movies array: " + movies);
                                console.log("******** movies array length: " + movies.length 
                                  + " index i " + i);
                                console.log("******** movies array index title: " + movies[j].Title);

                                if(j === i - 1) {
                                    console.log("***** end of list reached : j = " + j + " i = " + i);
                                    // At this point the array is filled up
                                    // Now it can be written to local storage
                                    localStorage.removeItem('Currentlist');
                                    let mar = JSON.stringify(movies);
                                    localStorage.setItem("Currentlist", mar);
                                    console.log("***** stringed movies: " + mar);

                                    let clist = JSON.parse(localStorage.getItem("Currentlist") || "[]");
                                    console.log("***** retrieved from local storage: " + clist.length);
                                }

                                j++;
                        
                
                            });  
                    //}


                }

            }
        });
}