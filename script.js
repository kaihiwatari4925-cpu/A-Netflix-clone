const API_KEY = '438efd42c0d3c8fcd74eac49eaca8c51'; // Teri TMDB Key
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;

const main = document.getElementById('main');
const search = document.getElementById('search');
const modal = document.getElementById('player-modal');
const player = document.getElementById('video-player');
const closeBtn = document.querySelector('.close');

// Movies Fetch Karo
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await data = await res.json();
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach((movie) => {
        const { title, poster_path, id } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}" onclick="playMovie(${id})">
            <p>${title}</p>
        `;
        main.appendChild(movieEl);
    });
}

// TeraBox/Premium Player Logic
function playMovie(id) {
    // Ye player automatic movie server se link connect karega
    player.src = `https://vidsrc.me/embed/movie?tmdb=${id}`;
    modal.style.display = "block";
}

closeBtn.onclick = () => {
    modal.style.display = "none";
    player.src = ""; // Stop video on close
}

// Search Logic
search.addEventListener('keyup', (e) => {
    const searchTerm = search.value;
    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);
    } else {
        window.location.reload();
    }
});
