import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import countryApi from '../api/countryApi';

const schema = yup.object().shape({
    country: yup.string().min(3, 'Title must be at least 3 characters').trim("No blank").required("Country name is required"),
});


const CountryAdd = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [mess, setMess] = useState(false);

    const onSubmitAddCountry = async (data) => {
        if (data.country !== null) {
            try {
                const response = await countryApi.addCountry({
                    name: data.country
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
            <h1 className="mt-4">Add Country</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/countries">Countries</Link></li>
                <li className="breadcrumb-item active">Add country</li>
            </ol>
            <div className="row">
                <form onSubmit={handleSubmit(onSubmitAddCountry)}>
                    <div class="mb-3">
                        <label for="country" class="form-label">Actor Name</label>
                        <input {...register("country")} type="text" className={`form-control ${errors.country ? 'is-invalid' : 'is-valid'}`} id="country" placeholder="Country name" />
                        <p className="text-danger">{errors.country?.message}</p>
                    </div>
                    {mess ? (
                        <div class="alert alert-success" role="alert">
                            Add country successfully
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

export default CountryAdd
