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
    profile = (params) => {
        const url = "/profile";
        return axiosClient.post(url, params);
    };
    userChar = () => {
        const url = "/admin/users/char-user";
        return axiosClient.get(url);
    };
    movieChar = () => {
        const url = "/admin/users/char-movie";
        return axiosClient.get(url);
    };
    movieCharAvg = () => {
        const url = "/admin/users/char-avg";
        return axiosClient.get(url);
    }
}

const userApi = new UserApi();
export default userApi;