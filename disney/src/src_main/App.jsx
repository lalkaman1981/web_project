import { Routes, Route } from 'react-router-dom';
import Login from '../components/login/login.jsx';
import Register from '../components/register/register.jsx';
import Home from '../components/home/home.jsx';
import Favorites from '../components/user/user_favorite.jsx';
import Originals from '../components/originals/originals.jsx';
import Profile from '../components/user/user.jsx';
import AboutUs from '../components/global_components/about_us.jsx';
import DeleteUser from '../components/user/delete_user.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/originals" element={<Originals />} />

      <Route path="/user" element={<Profile />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/about_us" element={<AboutUs />} />
      <Route path="/delete_user" element={<DeleteUser />} />
    </Routes>
  );
}

export default App;