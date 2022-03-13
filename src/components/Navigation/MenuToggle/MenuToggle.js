import React from 'react'
import classes from './MenuToggle.module.css'

function MenuToggle(props) {

	const cls = [
		classes.MenuToggle,
		'fa'
	]

	if (props.isOpen) {
		cls.push('fa-xmark')
		cls.push(classes.open) 
	} else {
		cls.push('fa-bars')
	}

  return (
    <i 
			className={cls.join(' ')}
			onClick = {props.onClick}
		/>
  )
}

export default MenuToggle