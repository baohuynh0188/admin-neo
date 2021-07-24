import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userApi from '../api/userApi';

const User = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userApi.getAll();
                setUsers(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, []);

    const deleteUser = async (username) => {
        try {
            const userList = users.filter((item) => item.username !== username);
            setUsers(userList);
            await userApi.delete(username);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Users</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                <li className="breadcrumb-item active">Users</li>
            </ol>
            <div className="card mb-4">
                <div className="card-body">
                    <p>User management</p>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    User List
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <colgroup>
                            <col span="1" style={{ width: "10%" }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Management</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Management</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {users.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.admin ? <span class="badge rounded-pill bg-warning">Admin</span> : <span class="badge rounded-pill bg-primary">User</span>}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Management">
                                            <button type="button" className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteUser(item.username) }}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                            {/* <Link to={`/users/profile/${item.username}`} className="btn btn-warning"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Link> */}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
// onClick={() => deleteUser(item.username)}
export default User
