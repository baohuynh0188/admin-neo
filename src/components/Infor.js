import React from 'react'
import { useStateValue } from "../context/StateProvider";
import { ACTION_TYPE } from "../reducers/reducer";
import { useHistory } from "react-router-dom";
import tools from "../tools";

const Infor = () => {
    let history = useHistory();

    const [state, dispatch] = useStateValue();

    let userLogin = "";
    if (localStorage.getItem("token")) {
        userLogin = tools.parseJwt(localStorage.getItem("token")).sub;
    } else {
        userLogin = "";
    }

    const handleLogout = () => {
        localStorage.clear();
        dispatch({ type: ACTION_TYPE.SIGN_OUT });
        history.push("/");
    };

    return (
        <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            <span className="mx-2">{userLogin}</span>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}><i className="fa fa-sign-out" aria-hidden="true"></i></button>
        </div >
    )
}

export default Infor
