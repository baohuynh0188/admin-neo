import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import genreApi from '../api/genreApi';

const schema = yup.object().shape({
    genreName: yup.string().min(3, 'Title must be at least 3 characters').trim("No blank").required("Genre name is required"),
});

const GenreAdd = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [mess, setMess] = useState(false);

    const onSubmitAddGenre = async (data) => {
        if (data.genreName !== null) {
            try {
                const response = await genreApi.addGenre({
                    name: data.genreName
                });
                setMess(true);
            } catch (error) {
                console.error(error);
                setMess(false);
            }
        }
    };

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Add genre</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/genres">Genre</Link></li>
                <li className="breadcrumb-item active">Add genre</li>
            </ol>
            <div className="row">
                <form onSubmit={handleSubmit(onSubmitAddGenre)}>
                    <div class="mb-3">
                        <label for="genreName" class="form-label">Genre Name</label>
                        <input {...register("genreName")} type="text" className={`form-control ${errors.genreName ? 'is-invalid' : 'is-valid'}`} id="genreName" placeholder="Genre name" />
                        <p className="text-danger">{errors.genreName?.message}</p>
                    </div>
                    {mess ? (
                        <div class="alert alert-success" role="alert">
                            Add genre successfully
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

export default GenreAdd
