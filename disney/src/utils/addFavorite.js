export async function addFavoriteFilm({ email, password, filmId }) {
    const resp1 = await fetch("http://localhost:3000/searchUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!resp1.ok) {
        throw new Error("No such user");
    }

    const data1 = await resp1.json();
    const userId = data1.id;
    if (!userId) {
        throw new Error("User ID is undefined");
    }

    const resp2 = await fetch("http://localhost:3000/addFavorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, film_id: filmId }),
    });

    if (!resp2.ok) {
        throw new Error("Can't add favorite film");
    }
}

export async function addFavoriteSeries({ email, password, seriesId }) {
    const resp1 = await fetch("http://localhost:3000/searchUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!resp1.ok) {
        throw new Error("No such user");
    }

    const data1 = await resp1.json();
    const userId = data1.id;
    if (!userId) {
        throw new Error("User ID is undefined");
    }

    // Use /addFavorite for series
    const resp2 = await fetch("http://localhost:3000/addFavorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, series_id: seriesId }),
    });

    if (!resp2.ok) {
        throw new Error("Can't add favorite series");
    }
}
