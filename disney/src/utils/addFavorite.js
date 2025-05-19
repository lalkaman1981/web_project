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

    const resp2 = await fetch("http://localhost:3000/addFilm", {
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

    const resp2 = await fetch("http://localhost:3000/addSeries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, series_id: seriesId }),
    });

    if (!resp2.ok) {
        throw new Error("Can't add favorite series");
    }
}

export async function removeFavoriteSeries({ email, password, seriesId }) {
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

    const resp2 = await fetch("http://localhost:3000/removeSeries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, series_id: seriesId }),
    });

    if (!resp2.ok) {
        throw new Error("Can't add favorite series");
    }
}

export async function removeFavoriteFilm({ email, password, filmId }) {
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

    const resp2 = await fetch("http://localhost:3000/removeFilm", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, film_id: filmId }),
    });

    if (!resp2.ok) {
        throw new Error("Can't add favorite series");
    }
}

export async function getAllFavorites({ email, password }) {
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

    const resp2 = await fetch("http://localhost:3000/findAllFavorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
    });

    if (!resp2.ok) {
        throw new Error("Can't add favorite series");
    }

    const data2 = await resp2.json();

    return data2
}

export async function checkUser({ email, password }) {
    const resp1 = await fetch("http://localhost:3000/searchUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!resp1.ok) {
        return false;
    }

    const data1 = await resp1.json();
    const userId = data1.id;
    if (!userId) {
        return false;
    }

    return true;
}

