import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/login'
import Anasayfa from './pages/page'
import AdminRoute from './routes/AdminRoute'
import Dashboard from './pages/yonetimPaneli/page'
import AdminLayout from './pages/yonetimPaneli/AdminLayout'
import AdminUsers from './pages/yonetimPaneli/users/page'
import JuriOnay from './pages/yonetimPaneli/juriOnay/page'
import IlanDetayPage from './pages/IlanDetay/page'

import Layout from './pages/Layout'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/auth/login' element={<Login/>}/>
        <Route element={<Layout/>}>
          <Route path='/' element={<Anasayfa/>}/>
          <Route path='/ilan-detay' element={<IlanDetayPage/>}/>
        </Route>
        {/* <Route path='/auth/register' element={<Register/>}/> */}

        <Route path='/yonetim-paneli' element={<AdminRoute/>}>
          <Route element={<AdminLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='users' element={<AdminUsers/>}/>
            <Route path='juri-onay' element={<JuriOnay/>}/>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App