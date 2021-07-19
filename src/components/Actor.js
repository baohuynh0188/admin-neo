import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import actorApi from '../api/actorApi';

const Actor = () => {

    const [actors, setActors] = useState([]);

    useEffect(() => {
        const fetchActors = async () => {
            try {
                const response = await actorApi.getAll();
                setActors(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchActors();
    }, []);

    const deleteActor = async (actor_name) => {
        try {
            const actorList = actors.filter(item => item.name !== actor_name);
            setActors(actorList);
            await actorApi.delete(actor_name);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Actors</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                <li className="breadcrumb-item active">Actors</li>
            </ol>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="btn-group" role="group" aria-label="Tools">
                        <Link to="/actors/add" className="btn btn-outline-success" ><i className="fa fa-plus" aria-hidden="true"></i></Link>
                    </div>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Actor List
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <colgroup>
                            <col span="1" style={{ width: "60%" }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Management</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Management</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {actors.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Management">
                                            <button type="button" className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteActor(item.name) }}><i className="fa fa-trash" aria-hidden="true"></i></button>
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

export default Actor
