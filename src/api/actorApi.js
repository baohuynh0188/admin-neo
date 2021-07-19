import axiosClient from "./axiosClient";

class ActorApi {

    getAll = () => {
        const url = "/admin/actors";
        return axiosClient.get(url);
    };
    delete = (name) => {
        const url = `/admin/actors/${name}`;
        return axiosClient.delete(url);
    };
    addActor = (params) => {
        const url = `/admin/actors`;
        return axiosClient.post(url, params);
    }
}

const actorApi = new ActorApi();
export default actorApi;