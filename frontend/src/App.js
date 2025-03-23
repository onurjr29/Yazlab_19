import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
 import Anasayfa from './pages/page'
import AdminRoute from './routes/AdminRoute'
import Dashboard from './pages/yonetimPaneli/page'
import AdminLayout from './pages/yonetimPaneli/AdminLayout'
import AdminUsers from './pages/yonetimPaneli/users/page'
import JuriOnay from './pages/yonetimPaneli/juriOnay/page'
import IlanDetayPage from './pages/IlanDetay/page.tsx'

import Layout from './pages/Layout'
import Ilanlar from './pages/yonetimPaneli/ilanlar/page'

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path='/auth/login' element={<Login/>}/>
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
            <Route path='juri-onay' element={<JuriOnay/>}/>
            <Route path='ilan-duzenle' element={<Ilanlar/>}/>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App