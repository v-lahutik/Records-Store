import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'


function Layout() {
  return (
    <div className='layout'>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout