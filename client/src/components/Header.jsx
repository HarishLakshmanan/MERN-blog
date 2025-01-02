import { Navbar } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
     <Navbar className='border-b-2'>
       <Link to="/" className='self-center whitespace-nowrap'>
         <span>Main</span>
         BloG
        </Link> 
      </Navbar>
    </div>
  )
}

export default Header
