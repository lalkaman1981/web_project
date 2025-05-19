const db_path = "../src_database/database.json";

const jsonServer = require("json-server");
const path = require("path");

const real_path = path.join(__dirname, db_path);
const server = jsonServer.create();
const router = jsonServer.router(real_path);
const middlewares = jsonServer.defaults();
const fs = require("fs");

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/addUser", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
    }

    const db = JSON.parse(fs.readFileSync(real_path, "utf-8"));
    const users = db.users;

    if (users.find((user) => user.email === email)) {
        return res.status(409).json({ error: "User already exists" });
    }

    const newUser = {
        id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        email,
        password,
        nickname: "",
    };

    users.push(newUser);
    fs.writeFileSync(real_path, JSON.stringify(db, null, 2));

    res.status(201).json(newUser);
});

server.delete("/removeUser", (req, res) => {
    const { email } = req.body;

    const db = JSON.parse(fs.readFileSync(real_path, "utf-8"));
    const users = db.users;

    const userToDelete = users.find((user) => user.email === email);
    
    if (!userToDelete) {
        return res.status(404).json({ error: "User not found" });
    }

    const userId = userToDelete.id;

    db.users = users.filter((user) => user.email !== email);

    db.favorites = db.favorites.filter((favorite) => favorite.id !== userId);

    fs.writeFileSync(real_path, JSON.stringify(db, null, 2));

    res.status(200).json({ message: "User and their favorites removed successfully" });
});

server.post("/searchUser", (req, res) => {
    const { email, password } = req.body;

    const db = JSON.parse(fs.readFileSync(real_path, "utf-8"));
    const user = db.users.find(
        (u) => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(404).json({ error: "Invalid credentials" });
    }

    res.status(200).json(user);
});

server.post("/findAllFavorites", (req, res) => {
    const { id } = req.body;
    const userId = Number(id);

    const db = JSON.parse(fs.readFileSync(real_path, "utf-8"));

    const userFavorites = db.favorites.find((fav) => fav.id === userId);

    const filmIds = userFavorites ? userFavorites.film_id : [];
    const seriesIds = userFavorites ? userFavorites.series_id : [];

    return res.status(200).json({ filmIds, seriesIds });
});

server.post("/addFilm", (req, res) => {
    const { user_id, film_id } = req.body;
    if (typeof user_id !== "number" || typeof film_id !== "number") {
      return res.status(400).json({ error: "wrong params type" });
    }

    const db = JSON.parse(fs.readFileSync(real_path, "utf-8"));
    let fav = db.favorites.find(f => f.id === user_id);
  
    if (!fav) {
      fav = { id: user_id, film_id: [], series_id: [] };
      db.favorites.push(fav);
    }

    if (!fav.film_id.includes(film_id)) {
      fav.film_id.push(film_id);
      fs.writeFileSync(real_path, JSON.stringify(db, null, 2));
      return res.status(201).json(fav);
    } else {
      return res.status(200).json({ message: "Film already in favorites", favorite: fav });
    }
});

server.post("/addSeries", (req, res) => {
    const { user_id, series_id } = req.body;
    if (typeof user_id !== "number" || typeof series_id !== "number") {
      return res.status(400).json({ error: "wrong params type" });
    }
  
    const db = JSON.parse(fs.readFileSync(real_path, "utf-8"));
    let fav = db.favorites.find(f => f.id === user_id);
  
    if (!fav) {
      fav = { id: user_id, film_id: [], series_id: [] };
      db.favorites.push(fav);
    }
  
    if (!fav.series_id.includes(series_id)) {
      fav.series_id.push(series_id);
      fs.writeFileSync(real_path, JSON.stringify(db, null, 2));
      return res.status(201).json(fav);
    } else {
      return res.status(200).json({ message: "Series are already in favorites", favorite: fav });
    }
});

server.delete("/removeFavorite", (req, res) => {
    const { id, film_id } = req.body;

    const db = JSON.parse(fs.readFileSync(real_path, "utf-8"));
    const favorites = db.favorites;
    const filtered = favorites.filter(
        (favorite) => favorite.id !== id && favorite.film_id !== film_id
    );

    if (favorites.length === filtered.length) {
        return res.status(404).json({ error: "User not found" });
    }

    db.users = filtered;
    fs.writeFileSync(real_path, JSON.stringify(db, null, 2));

    res.status(200).json({ message: "User removed" });
});

server.use(router);
server.listen(3000, () => {
    console.log("JSON Server is running on http://localhost:3000");
});
