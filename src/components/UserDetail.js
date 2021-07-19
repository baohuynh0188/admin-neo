import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router";

const UserDetail = () => {
    const params = useParams();
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Profile user - {params.username}</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/movies">User</Link></li>
                <li className="breadcrumb-item active">Profile user</li>
            </ol>
            <div className="row">
                <div className="col-6 mb-3">
                </div>
            </div>
        </div >
    )
}

export default UserDetail
