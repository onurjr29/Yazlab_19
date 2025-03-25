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
          <Route path='/ilan-detay/:id' element={<IlanDetayPage/>}/>
        </Route>
        {/* <Route path='/auth/register' element={<Register/>}/> */}

        <Route path='/yonetim-paneli' element={<AdminRoute/>}>
          <Route element={<AdminLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='users' element={<AdminUsers/>}/>
            <Route path='juri-onay/:id' element={<JuriOnayDetay />} /><Route path='juri-onay' element={<JuriOnay/>}/>
            <Route path='ilan-duzenle' element={<Ilanlar/>}/>
            <Route path='ilanlar/yeni' element={<IlanYeni/>}/>
            
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App