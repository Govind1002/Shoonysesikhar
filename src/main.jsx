import React from 'react'
import logo from './assets/logo.png' // Apne folder structure ke mutabiq path adjust karein

function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <img src={logo} alt="Logo" className="h-12 w-auto" />
      <h1 className="text-xl font-bold">Shoonysesikhar</h1>
    </header>
  )
}

export default Header