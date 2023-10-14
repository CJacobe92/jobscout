import {Routes, Route} from 'react-router-dom'
import Signup from './pages/auth/Signup'
import Landing from './pages/Landing'
import Signin from './pages/auth/Signin'
import Password from './pages/auth/Password'
import Layout from './pages/common/Layout'
import AdminDashboard from './pages/admin/AdminDashboard'
import Tenants from './pages/admin/Tenants'
import Step2 from './pages/auth/Step2'
import Step1 from './pages/auth/Step1'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/password' element={<Password />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/step1' element={<Step1 />} /> 
      <Route path='/step2' element={<Step2 />} /> 

      <Route element={<Layout />}>
        <Route path={'/dashboard/admin/:uid'} element={<AdminDashboard />}/>
        <Route path={'/tenants/admin/:uid'} element={<Tenants/>}/>
      </Route>
    </Routes>
  )
}

export default App