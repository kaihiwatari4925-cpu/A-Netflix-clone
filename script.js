const apiKey = "438efd42c0d3c8fcd74eac49eaca8c51"; // Teri working key
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/w500";

async function getMovies() {
    try {
        const res = await fetch(`${apiEndpoint}/movie/popular?api_key=${apiKey}`);
        const data = await res.json();
        if(data.results) {
            displayMovies(data.results);
        }
    } catch (error) {
        console.log("Error fetching movies:", error);
    }
}
getMovies(); // Ise call karna mat bhulna!
function playMovie(tmdbId) {
    // Ye universal player hai jo movies fetch karega
    const playerUrl = `https://vidsrc.me/embed/movie?tmdb=${tmdbId}`;
    const modal = document.getElementById('player-modal');
    document.getElementById('video-player').src = playerUrl;
    modal.style.display = 'block';
}
