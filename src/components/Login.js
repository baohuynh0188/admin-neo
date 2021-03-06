import { React, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import userApi from "../api/userApi";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useStateValue } from "../context/StateProvider";
import { ACTION_TYPE } from "../reducers/reducer";
import tool from "../tools"

const schema = yup.object().shape({
    username: yup.string().min(3, 'Username must be at least 3 characters').trim("No blank").required("Username is required"),
    password: yup.string().min(8, 'Password must be at least 8 characters').trim("No blank").required("Password is required"),
});

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [state, dispatch] = useStateValue();
    const [mess, setMess] = useState(false);

    let history = useHistory();

    const onSubmit = async (data) => {
        if (data.username !== null && data.password !== null) {
            try {
                const response = await userApi.login({
                    username: data.username,
                    password: data.password,
                });
                var checkAdmin = tool.parseJwt(response.data.token).sub
                if (checkAdmin.endsWith("-admin") === true) {
                    localStorage.setItem("token", response.data.token);
                    dispatch({ type: ACTION_TYPE.SIGN_IN });
                    history.push("/");
                    console.log(state.isSignIn);
                } else {
                    setMess(true);
                }
            } catch (error) {
                console.error(error);
                setMess(true);
            }
        }
    };

    return (
        <div className="bg-primary">
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="form-floating mb-3">
                                                    <input {...register("username")} className={`form-control ${errors.username ? 'is-invalid' : 'is-valid'}`} id="inputUsername" type="text" placeholder="username" />
                                                    <label htmlFor="inputUsername">Username</label>
                                                    <p className="text-danger">{errors.username?.message}</p>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input {...register("password")} className={`form-control ${errors.password ? 'is-invalid' : 'is-valid'}`} id="inputPassword" type="password" placeholder="Password" />
                                                    <label htmlFor="inputPassword">Password</label>
                                                    <p className="text-danger">{errors.password?.message}</p>
                                                </div>
                                                {mess ? (
                                                    <div className="alert alert-danger" role="alert">
                                                        Wrong username or password, please try again
                                                    </div>
                                                ) : ""}
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <button className="btn btn-primary" type="submit">Login</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div id="layoutAuthentication_footer">
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; Neo Movie 2021</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Login
