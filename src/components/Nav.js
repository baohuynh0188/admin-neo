import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            {/* <!-- Navbar Brand--> */}
            <Link to="/" className="navbar-brand ps-3">Admin</Link>
        </nav>
    )
}

export default Nav
