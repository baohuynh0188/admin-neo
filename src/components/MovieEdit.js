import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useParams } from "react-router";
import movieApi from '../api/movieApi';
import genreApi from '../api/genreApi';
import actorApi from '../api/actorApi';
import countryApi from '../api/countryApi';

const schema = yup.object().shape({
    title: yup.string().min(3, 'Title must be at least 3 characters').trim("No blank").required("Title is required"),
    language: yup.string().min(3, 'Language must be at least 3 characters').trim("No blank").required("Language is required"),
    duration: yup.number().positive("Much be positive").lessThan(2000, "Max 2000 minutes").integer("A number must be an integer").required("Duration is required"),
    year: yup.number().positive("Much be positive").lessThan(2099, "Max year 2099").moreThan(1900, "Minimum year 1900").integer("Year must be an integer").required("Year is required"),
    url: yup.string().url("Url is invalid").trim("No blank").required("Url is required"),
    content: yup.string().max(500, "Max 500 characters"),
});

const animatedComponents = makeAnimated();

const MovieEdit = () => {
    const params = useParams();
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema)
    });
    const [mess, setMess] = useState(false);
    const [errorMess, setErrorMess] = useState(false);
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [actors, setActors] = useState([]);
    const [countries, setCountries] = useState([]);
    const [genreOptions, setGenreOptions] = useState([]);
    const [publishOptions, setPublishOptions] = useState({ value: 0, label: "Draft" });
    const [actorOptions, setActorOptions] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);

    useEffect(() => {
        const fetchMoives = async () => {
            try {
                const response = await movieApi.editGet(params.id);
                setMovies(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchGenres = async () => {
            try {
                const response = await genreApi.getAll();
                setGenres(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchActors = async () => {
            try {
                const response = await actorApi.getAll();
                setActors(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        const fetchCountries = async () => {
            try {
                const response = await countryApi.getAll();
                setCountries(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchGenres();
        fetchCountries();
        fetchActors();
        fetchMoives();
    }, []);

    const handleChangePublish = (options) => {
        setPublishOptions(options);
    };

    const handleChangeGenres = (options) => {
        setGenreOptions(options);
    };

    const handleChangeCountries = (options) => {
        setCountryOptions(options);
    };

    const handleChangeActors = (options) => {
        setActorOptions(options);
    };

    var optionsGenres = [];
    var optionsCountries = [];
    var optionsActors = [];

    const PUBLISH = [
        { value: 0, label: "Draft" },
        { value: 1, label: "Public" },
        { value: 2, label: "Private" }
    ];

    genres.map((item) => {
        optionsGenres.push({ value: item.name, label: item.name })
    });

    actors.map((item) => {
        optionsActors.push({ value: item.name, label: item.name });
    })

    countries.map((item) => {
        optionsCountries.push({ value: item.country, label: item.country });
    });

    const onSubmit = (data) => {
        console.log(data)
        console.log(publishOptions.value)
    };

    const onSubmitEditMovie = async (data) => {
        const formData = new FormData();

        let genres = [];
        let actors = [];
        const genreValues = Object.values(genreOptions)
        const actorValues = Object.values(actorOptions)
        genreValues.map(item => genres.push(item.value));
        actorValues.map(item => actors.push(item.value));

        formData.append("id", params.id);
        formData.append("title", data.title);
        formData.append("poster", data.poster[0]);
        formData.append("content", data.content);
        formData.append("publish", publishOptions.value);
        if (countryOptions.value !== undefined) {
            formData.append("country", countryOptions.value);
            console.log(countryOptions.value);
        } else {
            formData.append("country", []);
        }
        formData.append("genres", genres.toString());
        formData.append("actors", actors.toString());
        formData.append("duration", data.duration);
        formData.append("language", data.language);
        formData.append("year", data.year);
        formData.append("url", data.url);

        try {
            await movieApi.editPut(formData);
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
            <h1 className="mt-4">Edit movie</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                <li className="breadcrumb-item"><Link to="/movies">Movies</Link></li>
                <li className="breadcrumb-item active">Edit movie</li>
            </ol>
            <div className="row">
                <form
                    onSubmit={handleSubmit(onSubmitEditMovie)}
                // onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input {...register("title")} type="text" defaultValue={movies.title} className={`form-control ${errors.title ? 'is-invalid' : 'is-valid'}`} id="title" placeholder="Title" />
                            <p className="text-danger">{errors.title?.message}</p>
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="language" className="form-label">Language</label>
                            <input {...register("language")} type="text" defaultValue={movies.language} className={`form-control ${errors.language ? 'is-invalid' : 'is-valid'}`} id="language" placeholder="Language" />
                            <p className="text-danger">{errors.language?.message}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <Controller
                                name="country"
                                control={control}
                                rules={{ required: true }}
                                render={({ }) => <Select
                                    closeMenuOnSelect={true}
                                    components={animatedComponents}
                                    onChange={handleChangeCountries}
                                    options={optionsCountries}
                                />}
                            />
                            {errors.country && <p className="text-danger">Country required</p>}
                        </div>
                        <div className="col-3 mb-3">
                            <label htmlFor="duration" className="form-label">Duration</label>
                            <input {...register("duration")} type="number" defaultValue={movies.duration} className={`form-control ${errors.duration ? 'is-invalid' : 'is-valid'}`} id="duration" placeholder="Duration" />
                            <p className="text-danger">{errors.duration?.message}</p>
                        </div>
                        <div className="col-3 mb-3">
                            <label htmlFor="year" className="form-label">Year</label>
                            <input {...register("year")} type="number" defaultValue={movies.year} className={`form-control ${errors.year ? 'is-invalid' : 'is-valid'}`} id="year" placeholder="Year" />
                            <p className="text-danger">{errors.year?.message}</p>
                        </div>
                        <div className="col-3 mb-3">
                            <label htmlFor="url" className="form-label">Url embed</label>
                            <input {...register("url")} type="text" defaultValue={movies.url} className={`form-control ${errors.url ? 'is-invalid' : 'is-valid'}`} id="url" placeholder="Url embed" />
                            <p className="text-danger">{errors.url?.message}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="actors" className="form-label">Actors</label>
                            <Controller
                                name="actors"
                                control={control}
                                rules={{ required: true }}
                                render={({ }) => <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    defaultValue={optionsActors[1]}
                                    isMulti
                                    onChange={handleChangeActors}
                                    options={optionsActors}
                                />}
                            />
                            {errors.actors && <p className="text-danger">Actors required</p>}
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="genres" className="form-label">Genres</label>
                            <Controller
                                name="genres"
                                control={control}
                                rules={{ required: true }}
                                render={({ }) => <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    defaultValue={optionsGenres[1]}
                                    isMulti
                                    onChange={handleChangeGenres}
                                    options={optionsGenres}
                                />}
                            />
                            {errors.genres && <p className="text-danger">Genres required"</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="formFile" className="form-label">Poster</label>
                            <input {...register("poster")} className={`form-control ${errors.poster ? 'is-invalid' : 'is-valid'}`} type="file" id="formFile" accept="image/*" />
                            <p className="text-danger">{errors.poster?.message}</p>
                        </div>
                        <div className="col-6 mb-3">
                            <img className="img-review" src={`http://127.0.0.1:9000/${movies.poster}`} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="publish" className="form-label">Publish</label>
                        <Controller
                            name="publish"
                            control={control}
                            rules={{ required: true }}
                            render={({ }) => <Select
                                closeMenuOnSelect={true}
                                components={animatedComponents}
                                defaultValue={PUBLISH[0]}
                                onChange={handleChangePublish}
                                options={PUBLISH}
                            />}
                        />
                        {errors.genres && <p className="text-danger">Publish required"</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <textarea {...register("content")} type="text" defaultValue={movies.content} className={`form-control ${errors.content ? 'is-invalid' : 'is-valid'}`} id="content" placeholder="Content"></textarea>
                        <p className="text-danger">{errors.content?.message}</p>
                    </div>
                    {mess ? (
                        <div className="alert alert-success" role="alert">
                            Edit movie successfully
                        </div>
                    ) : ""}
                    {errorMess ? (
                        <div className="alert alert-danger" role="alert">
                            Edit movie failed
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

export default MovieEdit
