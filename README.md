# Disney++ Web Project

A web application inspired by [Disney+](https://www.disneyplus.com/welcome), built with React, Vite, and a backend for user and favorites management.

## Design

- **Figma Template:** [Disney Plus Website (Community)](https://www.figma.com/design/zJWa8WkogM69FSTSq1Qozt/Disney-plus-website-(design-concept)-(Community)?node-id=0-1&p=f&t=QSgeX3e3PcRXDcLP-0)
- **Inspiration:** [Disney++](https://www.disneyplus.com/welcome)

## Features

- User registration, login, and account deletion
- Browse movies and series from [The Movie Database (TMDB)](https://www.themoviedb.org)
- Add/remove favorite movies and series
- Search for movies and series
- Persistent user sessions using localStorage

## Project Structure

```
disney/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── src_main/
│   ├── src_database/
│   ├── assets/
│   └── index.css
├── package.json
├── vite.config.js
├── script.sh
└── index.html
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/lalkaman1981/web_project
   cd disney
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env.local` file in the `disney/` directory.
   - Add your TMDB API key:
     ```
     VITE_API_KEY=YOUR_TMDB_API_KEY
     VITE_BEARER_TOKEN=Bearer YOUR_TMDB_BEARER_TOKEN
     ```

4. **Start the app (frontend + backend):**
   ```sh
   npm run start
   ```
   - This runs both the React frontend and the backend server (on port 3000).

5. **Open your browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Usage

```
cd disney
npm install
npm run start
```

- The backend server (user/favorites API) runs on [http://localhost:3000](http://localhost:3000).
- The frontend (React app) runs on [http://localhost:5173](http://localhost:5173) by default.

## API

- Uses [The Movie Database (TMDB)](https://www.themoviedb.org) for all movie and series data.
- Custom backend (see [`src/src_main/database.cjs`](disney/src/src_main/database.cjs)) for user and favorites management, using [`src/src_database/database.json`](disney/src/src_database/database.json) as a database.

## License

This project is for educational purposes only. All movie data and images are provided by TMDB and are subject to their [terms of use](https://www.themoviedb.org/terms-of-use)