import { Routes, Route } from 'react-router-dom';
import Login from '../components/login/login.jsx';
import Register from '../components/register/register.jsx';
import Home from '../components/home/home.jsx';
import Profile from '../components/user/user.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<Profile />} />
    </Routes>
  );
}

export default App;