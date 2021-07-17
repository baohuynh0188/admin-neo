import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import movieApi from '../api/movieApi';
import Badge from "./Badge";

const Movie = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMoives = async () => {
            try {
                const response = await movieApi.getAll();
                setMovies(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMoives();
    }, []);

    const deleteMoview = async (movie_id) => {
        try {
            const movieList = movies.filter((item) => item.id !== movie_id);
            setMovies(movieList);
            await movieApi.delete(movie_id);
            // console.log(movies);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Movies</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                <li className="breadcrumb-item active">Movies</li>
            </ol>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="btn-group" role="group" aria-label="Tools">
                        <Link to="/movies/add" className="btn btn-outline-success" ><i className="fa fa-plus" aria-hidden="true"></i></Link>
                    </div>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Movie List
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <colgroup>
                            <col span="1" style={{ width: "10%" }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Duration</th>
                                <th>Language</th>
                                <th>Year</th>
                                <th>Genres</th>
                                <th>Poster</th>
                                <th>Management</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Duration</th>
                                <th>Language</th>
                                <th>Year</th>
                                <th>Genres</th>
                                <th>Poster</th>
                                <th>Management</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {movies.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.movie.id}</td>
                                    <td>{item.movie.title}</td>
                                    <td>{item.movie.duration}</td>
                                    <td>{item.movie.language}</td>
                                    <td>{item.movie.year}</td>
                                    <td>
                                        <Badge genres={item.genres} />
                                    </td>
                                    <td><img className="img-review" src={`http://127.0.0.1:9000/${item.movie.poster}`} /></td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Management">
                                            <button type="button" className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteMoview(item.movie.id) }}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                            <Link to={`/movies/edit/${item.movie.id}`} className="btn btn-warning"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Link>
                                            <Link to={`/movies/detail/${item.movie.id}`} type="button" className="btn btn-success"><i className="fa fa-info-circle" aria-hidden="true"></i></Link>
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

export default Movie
