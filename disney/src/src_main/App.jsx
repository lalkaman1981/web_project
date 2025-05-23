import { Routes, Route } from 'react-router-dom';
import Login from '../components/login/login.jsx';
import Register from '../components/register/register.jsx';
import Home from '../components/home/home.jsx';
import Favorites from '../components/user/user_favorite.jsx';
import Originals from '../components/originals/originals.jsx';
import Movies from '../components/movies/movies.jsx';
import Series from '../components/series/series.jsx';
import AboutUs from '../components/global_components/about_us.jsx';
import Search from '../components/search/search.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/originals" element={<Originals />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/series" element={<Series />} />
      <Route path="/search" element={<Search />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/about_us" element={<AboutUs />} />
    </Routes>
  );
}

export default App;