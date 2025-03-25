import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Anasayfa from './pages/page';
import AdminRoute from './routes/AdminRoute';
import Dashboard from './pages/yonetimPaneli/page';
import AdminLayout from './pages/yonetimPaneli/AdminLayout';
import AdminUsers from './pages/yonetimPaneli/users/page';
import JuriOnay from './pages/yonetimPaneli/juriOnay/page';
import IlanDetayPage from './pages/IlanDetay/page';
import Layout from './pages/Layout';
import Ilanlar from './pages/yonetimPaneli/ilanlar/page';

interface UserType {
  token: string;
  id: string;
  role: string;
}

const App = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;

    const allowedPublicRoutes = ['/auth/login', '/auth/register'];

    if (!user && !allowedPublicRoutes.includes(currentPath)) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Anasayfa />} />
        <Route path='/auth/login' element={<Login setUser={setUser} />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/ilan-detay/:id' element={<IlanDetayPage />} />
      </Route>

      <Route path='/yonetim-paneli' element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='users' element={<AdminUsers />} />
          <Route path='juri-onay' element={<JuriOnay />} />
          <Route path='ilan-duzenle' element={<Ilanlar />} />
        </Route>
      </Route>
    </Routes>
  );
};

const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
