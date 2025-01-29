import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';
import DashProfile from '../components/DashProfile';
import DashSidebar from '../components/DashSidebar';
import DashPost from '../components/DashPost';
import DashUsers from '../components/DashUsers';

function Dashboard() {
  const location = useLocation();
  const [tab,setTab]=useState('');
  useEffect(()=>{
    const urlParms = new URLSearchParams(location.search);
    const tabFromUrl = urlParms.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search]);
  return (
    <div className='min-h- h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/*sidebar*/}
       <DashSidebar/>
      </div>
      {/* profile */}
      {tab === 'profile' && <DashProfile/>}
      {/* posts */}
      {tab === 'posts' && <DashPost/>}
      {/* users */}
      {tab === 'users'  && <DashUsers/>}
    </div>
  )
}

export default Dashboard
