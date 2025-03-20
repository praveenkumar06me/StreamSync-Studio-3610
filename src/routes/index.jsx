import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Library from '../pages/Library';
import Search from '../pages/Search';
import Playlist from '../pages/Playlist';
import Artist from '../pages/Artist';
import Album from '../pages/Album';
import Profile from '../pages/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/library" element={<Library />} />
      <Route path="/search" element={<Search />} />
      <Route path="/playlist/:id" element={<Playlist />} />
      <Route path="/artist/:id" element={<Artist />} />
      <Route path="/album/:id" element={<Album />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;