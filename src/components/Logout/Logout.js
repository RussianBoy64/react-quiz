import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/auth'

function Logout(props) {
  const navigate = useNavigate()
  
  useEffect(() => {
    props.logout()
    navigate('/')
  }, [])

  return (
    <></>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)