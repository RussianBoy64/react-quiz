import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'


function Drawer(props) {
  
	const links = [{to: '/', label: 'Список'}]

	if (props.isAuthenticated) {
		links.push({to: '/quiz-creator', label: 'Создать тест'})
		links.push({to: '/logout', label: 'Выйти'})
	} else {
		links.push({to: '/auth', label: 'Авторизация'})
	}


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