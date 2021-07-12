import axiosClient from "./axiosClient";

class GenreApi {
  getAll = () => {
    const url = "/admin/genres";
    return axiosClient.get(url);
  };
  delete = (id) => {
    const url = `/admin/genres/${id}`;
    return axiosClient.delete(url);
  };
  addGenre = (params) => {
    const url = `/admin/genres`;
    return axiosClient.post(url, params);
  }
}

const genreApi = new GenreApi();
export default genreApi;
