import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import actorApi from '../api/actorApi';

const schema = yup.object().shape({
    actorName: yup.string().min(3, 'Title must be at least 3 characters').trim("No blank").required("Actor name is required"),
});


const ActorAdd = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [mess, setMess] = useState(false);

    const onSubmitAddActor = async (data) => {
        if (data.actorName !== null) {
            try {
                const response = await actorApi.addActor({
                    name: data.actorName
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
            <h1 className="mt-4">Add Actor</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/actors">Actors</Link></li>
                <li className="breadcrumb-item active">Add Actor</li>
            </ol>
            <div className="row">
                <form onSubmit={handleSubmit(onSubmitAddActor)}>
                    <div class="mb-3">
                        <label for="actorName" class="form-label">Actor Name</label>
                        <input {...register("actorName")} type="text" className={`form-control ${errors.actorName ? 'is-invalid' : 'is-valid'}`} id="actorName" placeholder="Actor name" />
                        <p className="text-danger">{errors.actorName?.message}</p>
                    </div>
                    {mess ? (
                        <div class="alert alert-success" role="alert">
                            Add actor successfully
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

export default ActorAdd
