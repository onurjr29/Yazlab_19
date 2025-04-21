import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
 import Anasayfa from './pages/page'
import AdminRoute from './routes/AdminRoute'
import Dashboard from './pages/yonetimPaneli/page'
import AdminLayout from './pages/yonetimPaneli/AdminLayout'
import AdminUsers from './pages/yonetimPaneli/users/page'
import JuriOnay from './pages/yonetimPaneli/juriOnay/page'
import IlanDetayPage from './pages//IlanDetay/page'
import Layout from './pages/Layout'
import Ilanlar from './pages/yonetimPaneli/ilanlar/page'
import { useState } from 'react'
import JuriOnayDetay from './pages/yonetimPaneli/juriOnay/[id]'
import IlanYeni from './pages/yonetimPaneli/ilanlar/yeni/page'
import IlanDuzenle from './pages/yonetimPaneli/ilanlar/ilanDuzenle/page'
import YoneticiOnayDetay from './pages/yonetimPaneli/YoneticiOnay/[id]'
import YoneticiOnayListe from './pages/yonetimPaneli/YoneticiOnay/page'
import Basvurularim from './pages/basvurularim/page'
import RoleBasedRoute from './routes/RoleBasedRoute'

interface UserType {
  token: string;
  id: string;
  role: string;
}


const App = () => {
  const [user, setUser] = useState<UserType | null>(null);
  
  return (
    <Router>
      <Routes>
      <Route path='/auth/login' element={<Login setUser={setUser}/>}/>
      <Route path='/auth/register' element={<Register/>}/>
      <Route element={<Layout/>}>
          <Route path='/' element={<Anasayfa/>}/>
          <Route path='/basvurularim' element={<Basvurularim/>}/>
          <Route path='/ilan-detay/:id' element={<IlanDetayPage/>}/>
        </Route>
        {/* <Route path='/auth/register' element={<Register/>}/> */}

        <Route path='/yonetim-paneli' element={<RoleBasedRoute allowedRoles={["admin", "jury", "manager"]} />}>
  <Route element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path='dashboard' element={<Dashboard />} />
    <Route path='users' element={<AdminUsers />} />

    {/* Jüri Onay Sayfası (admin + jury) */}
    <Route path='juri-onay/:id' element={
      <RoleBasedRoute allowedRoles={["admin", "jury"]} />
    }> 
      <Route index element={<JuriOnayDetay />} />
    </Route>
    <Route path='juri-onay' element={
      <RoleBasedRoute allowedRoles={["admin", "jury"]} />
    }>
      <Route index element={<JuriOnay />} />
    </Route>

    {/* Yönetici Onay Sayfası (admin + yonetici) */}
    <Route path='yonetici-onay/:id' element={
      <RoleBasedRoute allowedRoles={["admin", "manager"]} />
    }>
      <Route index element={<YoneticiOnayDetay />} />
    </Route>
    <Route path='yonetici-onay' element={
      <RoleBasedRoute allowedRoles={["admin", "manager"]} />
    }>
      <Route index element={<YoneticiOnayListe />} />
    </Route>

    {/* Admin'e özel sayfalar */}
    <Route element={<RoleBasedRoute allowedRoles={["admin"]} />}>
  <Route path='ilan-duzenle' element={<Ilanlar />} />
  <Route path='ilanlar/yeni' element={<IlanYeni />} />
  <Route path='ilanlar/duzenle/:id' element={<IlanDuzenle />} />
</Route>
  </Route>
</Route>
      </Routes>
    </Router>
  )
}

export default App