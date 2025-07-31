import React, { useContext } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import { OnlineStatusContext } from '../../Context/OnlineStatusContext';
import NoInternet from '../../Components/NoInternet/NoInternet';

export default function Layout() {
  const { isOnline } = useContext(OnlineStatusContext);
  return (
    <>
        <Navbar/>
        <div className="container">
          { !isOnline?<NoInternet />:
          <Outlet/>}
        </div>
        <Footer/>
    </>
  )
}
