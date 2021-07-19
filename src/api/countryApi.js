import axiosClient from "./axiosClient";

class CountryApi {
    getAll = () => {
        const url = "/admin/countries";
        return axiosClient.get(url);
    };
    delete = (name) => {
        const url = `/admin/countries/${name}`;
        return axiosClient.delete(url);
    };
    addCountry = (params) => {
        const url = `/admin/countries`;
        return axiosClient.post(url, params);
    }
}

const countryApi = new CountryApi();
export default countryApi;