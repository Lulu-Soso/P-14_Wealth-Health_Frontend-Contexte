import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
    <h1>Welcome to Wealth Health !</h1>
    <Link to="/employees/create">
      Create employees
    </Link>
    </>
  )
}

export default HomePage