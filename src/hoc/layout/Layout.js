import React, {useState } from 'react'
import classes from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'

function Layout(props) {
  
  let [menu, setMenu] = useState(false)

  const openHandler = () => {
    setMenu(!menu)
  }
  
  return (
    <div className={classes.layout}>
        <MenuToggle 
          onClick={() => openHandler()}
          isOpen = {menu}
        />
        <main>
            {props.children}
        </main>
    </div>
  )
}

export default Layout