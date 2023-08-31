import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear()
  return (
    <footer> Wealth Health &copy; {currentYear}</footer>
  )
}

export default Footer