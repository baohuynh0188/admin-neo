import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import movieApi from '../api/movieApi';

const MovieAdd = () => {
    const { register, handleSubmit } = useForm();
    const [mess, setMess] = useState(false);
    const [errorMess, setErrorMess] = useState(false);

    const onSubmitAddMovie = async (data) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("poster", data.poster[0]);
        formData.append("content", data.content);
        formData.append("duration", data.duration);
        formData.append("language", data.language);
        formData.append("country", data.country);
        formData.append("genres", data.genres);
        formData.append("year", data.year);
        formData.append("actors", data.actors);
        formData.append("url", data.url);

        try {
            await movieApi.addMovie(formData);
            setMess(true);
            setErrorMess(false);
        } catch (error) {
            console.error(error);
            setMess(false);
            setErrorMess(true);
        }

    };

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Add movie</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/movies">Movies</Link></li>
                <li className="breadcrumb-item active">Add movie</li>
            </ol>
            <div className="row">
                <form onSubmit={handleSubmit(onSubmitAddMovie)}>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input {...register("title", { required: true, minLength: 1 })} type="text" className="form-control" id="title" placeholder="Title" minLength="1" required />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="language" className="form-label">Language</label>
                            <input {...register("language", { required: true, minLength: 1 })} type="text" className="form-control" id="language" placeholder="Language" minLength="1" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input {...register("country", { required: true, minLength: 1 })} type="text" className="form-control" id="country" placeholder="Country" minLength="1" required />
                        </div>
                        <div className="col-3 mb-3">
                            <label htmlFor="duration" className="form-label">Duration</label>
                            <input {...register("duration", { required: true, minLength: 1 })} type="number" className="form-control" id="duration" placeholder="Duration" minLength="1" required />
                        </div>
                        <div className="col-3 mb-3">
                            <label htmlFor="year" className="form-label">Year</label>
                            <input {...register("year", { required: true, minLength: 1 })} type="number" className="form-control" id="year" placeholder="Year" minLength="1" required />
                        </div>
                        <div className="col-3 mb-3">
                            <label htmlFor="url" className="form-label">Url embed</label>
                            <input {...register("url", { required: true, minLength: 1 })} type="text" className="form-control" id="url" placeholder="Url embed" minLength="1" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="actors" className="form-label">Actors</label>
                            <input {...register("actors", { required: true, minLength: 1 })} type="text" className="form-control" id="actors" placeholder="Actors" minLength="1" required />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="genres" className="form-label">Genres</label>
                            <input {...register("genres", { required: true, minLength: 1 })} type="text" className="form-control" id="genres" placeholder="Genres" minLength="1" required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Poster</label>
                        <input {...register("poster", { required: true })} className="form-control" type="file" id="formFile" accept="image/*" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <textarea {...register("content", { required: true, minLength: 1 })} type="text" className="form-control" id="content" placeholder="Content" minLength="1" required ></textarea>
                    </div>
                    {mess ? (
                        <div className="alert alert-success" role="alert">
                            Add movie successfully
                        </div>
                    ) : ""}
                    {errorMess ? (
                        <div className="alert alert-danger" role="alert">
                            Add movie failed
                        </div>
                    ) : ""}
                    <div className="mb-3">
                        <button type="submit" className="btn btn-success">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MovieAdd
