import { auth } from '@/services/storage'
import Sidebar from './Sidebar';
import { Navigate, Outlet } from 'react-router-dom';


const Layout = () => {

  const authorized = auth.get();
  
  return authorized ? (
    <div className='flex flex-row'>
      <Sidebar />
      <Outlet />
    </div>
  ) : <Navigate to='/signin' />
}

export default Layout