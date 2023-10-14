
import { Link, Outlet, useParams } from 'react-router-dom'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import Groups2Icon from '@mui/icons-material/Groups2';
import { role } from '@/services/storage';
import { Button } from '@/components/ui/button';

type Items = {
  name: string,
  path: string,
  icon: React.ReactNode;
}

const Sidebar = () => {
  
  const { uid } = useParams();
  const type = role.get() || '';

  const adminItems: Items[] = [
    {
      name: 'Dashboard',
      path: `/dashboard/${type}/${uid}`,
      icon: <DashboardIcon style={{fontSize: '1.5rem'}}/>
    },
    {
      name: 'Tenants',
      path: `/tenants/${type}/${uid}`,
      icon: <FolderSharedIcon style={{fontSize: '1.5rem'}}/>
    }
  ]

  const selectMenuItems = () => {
    switch (type) {
      case 'admin':
        return adminItems;
    }
  }

  const menuItems = selectMenuItems();

  return (
    <div className='flex flex-col items-center'>
      {menuItems?.map((data, index) => (
        <Button key={index} className='w-full'>
          <Link to={data.path}>
            {data.icon}
            <span>{data.name}</span>
          </Link>
        </Button>
      ))}  
    </div>
  )
}

export default Sidebar