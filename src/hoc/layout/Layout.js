import React from 'react'
import classes from './Layout.module.css'

function Layout(props) {
  return (
    <div className={classes.layout}>
        
        <main>
            {props.children}
        </main>
    </div>
  )
}

export default Layout