import { useState } from 'react'
import './App.css'
import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div className='navb h-12 border bg-purple-600 text-white flex justify-around items-center font-open'>
        <div className="heading">
            <h1>iTask</h1>
        </div>
        <ul className='flex gap-9'>
            <li>Home</li>
            <li>Tasks</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar

