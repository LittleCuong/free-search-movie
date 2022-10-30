import axiosClient from "./apiClient";
import apiConfig from "./apiConfig";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated',
    similar: 'similar',
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air',
    similar: 'similar',
}

const tmdApi = {
    getMovie: (id, params) => {
        const url = 'movie/' + id;
        return axiosClient.get(url, {params: {}})
    },
    getMovieList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, params);
    },
    getTvList: (type, params) => {
        const url = 'tv/' + tvType[type];
        return axiosClient.get(url, params);
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, {params: {}});
    },
    search: (cate, params) => {
        const url = 'search/' + category[cate];
        return axiosClient.get(url, params);
    },
    searchResult: (id) => {
        const url = 'movie/' + id
        return axiosClient.get(url, {params: {}})
    },
    detail: (cate, id, params) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, params)
    },
    detail2: (id, params) => {
        const url = '/' + id;
        return axiosClient.get(url, params)
    },
    credit: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, {params: {}});
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient.get(url, {params: {}});
    },
    genres: () => {
        const url = 'genre/movie/list';
        return axiosClient.get(url, {params: {}})
    },
    discover: (genreID) => {
        const url = 'discover/movie?api_key=' + apiConfig.apiKey + '&with_genres=' + genreID;
        return axiosClient.get(url)
    }
}

export default tmdApi;