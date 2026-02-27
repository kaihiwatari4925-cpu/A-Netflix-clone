const apiKey = "438efd42c0d3c8fcd74eac49eaca8c51"; 
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById('main');

async function getMovies() {
    try {
        const response = await fetch(`${apiEndpoint}/movie/popular?api_key=${apiKey}&language=hi-IN&page=1`);
        const data = await response.json();
        if (data.results) {
            displayMovies(data.results);
        }
    } catch (error) {
        console.error("Posters load nahi hue:", error);
    }
}

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

// MovieMaza Player Logic (Supports Premium Streaming)
function playMovie(id) {
    const playerUrl = `https://vidsrc.me/embed/movie?tmdb=${id}`;
    const modal = document.getElementById('player-modal');
    document.getElementById('video-player').src = playerUrl;
    modal.style.display = 'block';
}

// Close Modal logic
document.querySelector('.close').onclick = () => {
    document.getElementById('player-modal').style.display = 'none';
    document.getElementById('video-player').src = '';
}

getMovies();
