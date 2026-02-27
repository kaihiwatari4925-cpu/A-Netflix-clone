const API_KEY = '438efd42c0d3c8fcd74eac49eaca8c51'; // Teri active key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');
const search = document.getElementById('search');
const modal = document.getElementById('player-modal');
const player = document.getElementById('video-player');
const closeBtn = document.querySelector('.close');

// Initial Load
getMovies(`${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    if(data.results.length > 0) {
        showMovies(data.results);
    } else {
        main.innerHTML = `<h2 style="padding:20px">No Movies Found</h2>`;
    }
}

function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach((movie) => {
        const { title, poster_path, id } = movie;
        if(poster_path) {
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie');
            movieEl.innerHTML = `
                <img src="${IMG_URL + poster_path}" alt="${title}" onclick="playMovie(${id})">
                <div class="movie-info"><h3>${title}</h3></div>
            `;
            main.appendChild(movieEl);
        }
    });
}

// Play Movie Logic
function playMovie(id) {
    // Ye automatic movies fetch karega (Terabox support jaisa)
    player.src = `https://vidsrc.me/embed/movie?tmdb=${id}`;
    modal.style.display = "block";
}

closeBtn.onclick = () => {
    modal.style.display = "none";
    player.src = "";
}

// Search Feature
search.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        const query = search.value;
        if(query) {
            getMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        }
    }
});
