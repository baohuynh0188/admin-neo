import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import genreApi from '../api/genreApi';

const Genre = () => {
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await genreApi.getAll();
                setGenres(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchGenres();
    }, []);

    const deleteGenre = async (genre_name) => {
        try {
            const genreList = genres.filter(item => item.name !== genre_name);
            setGenres(genreList);
            await genreApi.delete(genre_name);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Genres</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                <li className="breadcrumb-item active">Genres</li>
            </ol>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="btn-group" role="group" aria-label="Tools">
                        <Link to="/genres/add" className="btn btn-outline-success" ><i className="fa fa-plus" aria-hidden="true"></i></Link>
                    </div>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Genre List
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
                            {genres.map((item, index) => (
                                <tr key={index}>
                                    {/* () => deleteGenre(item.id) */}
                                    <td>{item.name}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Management">
                                            <button type="button" className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteGenre(item.name) }}><i className="fa fa-trash" aria-hidden="true"></i></button>
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

export default Genre
