const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export async function fetchMovies(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
    });
    const data = await response.json();
    return data.results;
}

export async function fetchLogo(movieId) {
    const response = await fetch(`${API_URL}/movie/${movieId}/images`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
    });
    const data = await response.json();
    const enLogos = data.logos?.filter(logo => logo.iso_639_1 === 'en');
    if (enLogos && enLogos.length > 0) {
        return `${IMAGE_BASE_URL}${enLogos[0].file_path}`;
    }
    return null;
}

export async function fetchPopularMovie() {
    const response = await fetch(`${API_URL}/movie/popular?language=en-US&page=1`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
    });
    const data = await response.json();
    return data.results[0];
}

export { API_URL, IMAGE_BASE_URL };
