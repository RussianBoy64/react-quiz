import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'


const links = [
	{
    to: '/',
	  label: 'Список'
	}, 
	{
    to: '/auth',
	  label: 'Авторизация'
	}, 
	{
    to: '/quiz-creator',
	  label: 'Создать тест'
	}
]

function Drawer(props) {
  
	const cls = [
		classes.Drawer,
	]

	if (!props.isOpen) {
		cls.push(classes.close)
	}
	
	return (
		<>
			<nav className={cls.join(' ')}>
				<ul>
					{links.map((link, index) => {
						return (
							<li key={index}>
								<NavLink 
                to = {link.to}
                onClick = {props.onClick}
                >
                  {link.label}
                </NavLink>
							</li>
						)})
					}
				</ul>
			</nav>
			{props.isOpen && <Backdrop onClick={props.onClick}/>}
		</>
  )
}

export default Drawer