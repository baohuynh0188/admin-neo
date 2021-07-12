import axiosClient from "./axiosClient";

class UserApi {
    getAll = () => {
        const url = "/admin/users";
        return axiosClient.get(url);
    };
    delete = (id) => {
        const url = `/admin/users/${id}`;
        return axiosClient.delete(url);
    };
    login = (params) => {
        const url = "/login";
        return axiosClient.post(url, params);
    };
}

const userApi = new UserApi();
export default userApi;