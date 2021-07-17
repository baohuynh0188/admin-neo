import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router";
import movieApi from '../api/movieApi';

const MovieDetail = () => {
    const params = useParams();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMoives = async () => {
            try {
                const response = await movieApi.getOne(params.id);
                setMovies(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMoives();
    }, []);

    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Detail movie - {movies.title}</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/movies">Movies</Link></li>
                <li className="breadcrumb-item active">Detail movie</li>
            </ol>
            <div className="row">
                <div className="col-6 mb-3">
                    <div className="row">
                        <div className="col-2 my-4">
                            <span className="">ID:</span>
                        </div>
                        <div className="col-10 my-4">{movies.id}</div>
                    </div>
                    <div className="row">
                        <div className="col-2 my-4">
                            <span className="">Title:</span>
                        </div>
                        <div className="col-10 my-4">{movies.title}</div>
                    </div>
                    <div className="row">
                        <div className="col-2 my-4">
                            <span className="">Duration:</span>
                        </div>
                        <div className="col-10 my-4">{movies.duration}</div>
                    </div>
                    <div className="row">
                        <div className="col-2 my-4">
                            <span className="">language:</span>
                        </div>
                        <div className="col-10 my-4">{movies.language}</div>
                    </div>
                    <div className="row">
                        <div className="col-2 my-4">
                            <span className="">Year:</span>
                        </div>
                        <div className="col-10 my-4">{movies.year}</div>
                    </div>
                    <div className="row">
                        <div className="col-2 my-4">
                            <span className="">Slug:</span>
                        </div>
                        <div className="col-10 my-4">{movies.slug}</div>
                    </div>
                    <div className="row">
                        <div className="col-2 my-4">
                            <span className="">Embed url:</span>
                        </div>
                        <div className="col-10 my-4">{movies.url}</div>
                    </div>
                    <div className="row">
                        <div className="col-2 my-4">
                            <span className="">Created at:</span>
                        </div>
                        <div className="col-10 my-4">{timeConverter(movies.timestamp)}</div>
                    </div>
                    <div className="row">
                        <div className="col-2 my-4">
                            <span className="">Content:</span>
                        </div>
                        <div className="col-10 my-4">{movies.content}</div>
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <figure className="figure">
                        <img src={`http://127.0.0.1:9000/${movies.poster}`} className="figure-img img-fluid rounded" alt="A generic square placeholder image with rounded corners in a figure." />
                        <figcaption className="figure-caption">A caption for the above image.</figcaption>
                    </figure>
                </div>
            </div>
        </div >
    )
}

export default MovieDetail
