import axiosClient from "./axiosClient";

class MovieApi {
    getAll = () => {
        const url = "/admin/movies";
        return axiosClient.get(url);
    };
    getOne = (id) => {
        const url = `/admin/movies/${id}`;
        return axiosClient.get(url);
    }
    addMovie = (params) => {
        const url = "/admin/movies";
        return axiosClient.post(url, params);
    }
    delete = (id) => {
        const url = `/admin/movies/${id}`;
        return axiosClient.delete(url);
    }
    count = () => {
        const url = `/admin/count`;
        return axiosClient.get(url);
    }
    editGet = (id) => {
        const url = `/admin/movies/update/${id}`;
        return axiosClient.get(url);
    }
    editPut = (params) => {
        const url = `/admin/movies/update`;
        return axiosClient.put(url, params);
    }
}

const movieApi = new MovieApi();
export default movieApi;