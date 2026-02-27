const apiKey = "438efd42c0d3c8fcd74eac49eaca8c51"; 
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById('main');

// Movies fetch karne ka function
async function getMovies() {
    try {
        const response = await fetch(`${apiEndpoint}/movie/popular?api_key=${apiKey}&language=hi-IN&page=1`);
        const data = await response.json();
        
        if (data.results) {
            displayMovies(data.results);
        }
    } catch (error) {
        console.error("Data load nahi hua:", error);
    }
}

// Movies screen par dikhane ka function
function displayMovies(movies) {
    main.innerHTML = '';
    movies.forEach(movie => {
        const { title, poster_path, id } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${imgPath + poster_path}" alt="${title}" onclick="playMovie(${id})">
            <div class="movie-info">
                <h3>${title}</h3>
            </div>
        `;
        main.appendChild(movieEl);
    });
}

// Movie play karne ka function (TeraBox Premium logic)
function playMovie(id) {
    const playerUrl = `https://vidsrc.me/embed/movie?tmdb=${id}`;
    window.open(playerUrl, '_blank'); 
}

// App start hote hi movies load karein
getMovies();
