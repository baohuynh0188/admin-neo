import React from 'react'
import { Link } from 'react-router-dom'
import Infor from './Infor'

const Silde = () => {
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Core</div>
                        <Link to="/" className="nav-link collapsed">
                            <div className="sb-nav-link-icon"><i className="fa fa-tachometer"></i></div>
                            Dashboard
                        </Link>
                        <div className="sb-sidenav-menu-heading">Interface</div>
                        <Link to="/genres" className="nav-link collapsed" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fa fa-superpowers"></i></div>
                            Genres
                        </Link>
                        <Link to="/actors" className="nav-link collapsed" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i class="fa fa-gratipay" aria-hidden="true"></i></div>
                            Actors
                        </Link>
                        <Link to="/countries" className="nav-link collapsed" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i class="fa fa-bookmark-o" aria-hidden="true"></i></div>
                            Countries
                        </Link>
                        <Link to="/users" className="nav-link collapsed" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fa fa-user"></i></div>
                            Users
                        </Link>
                        <Link to="/movies" className="nav-link collapsed" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fa fa-film"></i></div>
                            Movies
                        </Link>
                    </div>
                </div>
                <Infor />
            </nav>
        </div>
    )
}

export default Silde
