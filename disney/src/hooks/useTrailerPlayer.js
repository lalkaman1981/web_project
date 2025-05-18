import { useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.themoviedb.org/3";

export default function useTrailerPlayer() {
    const [trailerKey, setTrailerKey] = useState(null);
    const [noTrailerMessage, setNoTrailerMessage] = useState(null);

    const playTrailer = async (item) => {
        const endpoint = item.title
            ? `/movie/${item.id}/videos`
            : `/tv/${item.id}/videos`;

        try {
            const res = await fetch(`${API_URL}${endpoint}`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                }
            });
            const data = await res.json();
            const trailer = data.results.find(
                v => v.type === 'Trailer' && v.site === 'YouTube'
            );

            if (trailer) {
                setTrailerKey(trailer.key);
                setNoTrailerMessage(null);
            } else {
                setTrailerKey(null);
                setNoTrailerMessage('Trailer not available');
            }
        } catch (error) {
            setTrailerKey(null);
            setNoTrailerMessage('Failed to load trailer');
        }
    };

    const closeTrailer = () => setTrailerKey(null);
    const closeMessage = () => setNoTrailerMessage(null);

    return {
        trailerKey,
        noTrailerMessage,
        playTrailer,
        closeTrailer,
        closeMessage
    };
}
