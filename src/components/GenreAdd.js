import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import genreApi from '../api/genreApi';

const GenreAdd = () => {
    const { register, handleSubmit } = useForm();
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
                        <input {...register("genreName", { required: true, minLength: 1 })} type="text" class="form-control" id="genreName" placeholder="Genre name" minLength="1" required />
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
