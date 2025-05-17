import { Routes, Route } from 'react-router-dom';
import Login from '../components/login/login.jsx';
import Register from '../components/register/register.jsx';
import Home from '../components/home/home.jsx';
import Favorites from '../components/user/user_favorite.jsx';
import Originals from '../components/originals/originals.jsx';
import Search from '../components/search/search.jsx';
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<Favorites />} />
      <Route path="/originals" element={<Originals />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;