import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import classes from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'

function Layout(props) {
  
  let [menu, setMenu] = useState(false)

  const openHandler = () => {
    setMenu(!menu)
  }

  const menuClose = () => {
    setMenu(false)
  }
  
  return (
    <div className={classes.layout}>
      <MenuToggle 
        onClick={openHandler}
        isOpen = {menu}
      />
      
      <Drawer
        onClick = {menuClose}
        isOpen = {menu}
      />

      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default Layout