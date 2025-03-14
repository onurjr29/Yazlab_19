import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/login'
import Anasayfa from './pages/anasayfa'
import AdminRoute from './routes/AdminRoute'
import Dashboard from './pages/yonetimPaneli/dashboard'
import AdminLayout from './pages/yonetimPaneli/AdminLayout'
import AdminUsers from './pages/yonetimPaneli/users/page'
import JuriOnay from './pages/yonetimPaneli/juriOnay/page'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/anasayfa' element={<Anasayfa/>}/>
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