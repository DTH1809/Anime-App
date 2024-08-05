import axios from "axios";

export const fetchFromApiTopAnime = async () => {
    try {
        const response = await axios.get("https://api.jikan.moe/v4/top/anime");
        return response.data; // Return the actual data from the response
    } catch (error) {
        console.error(error); // Use console.error for error logging
    }
};

export const fetchFromApiSeasonAnime = async () => {
    try {
        const response = await axios.get("https://api.jikan.moe/v4/seasons/now");
        return response.data; // Return the actual data from the response
    } catch (error) {
        console.error(error); // Use console.error for error logging
    }
};

export const fetchAnimeDetail = async (id) => {
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const fetchSearchAnimes = async (query) => {
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}&limit=12&type=tv&order_by=score`)

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchGenreAnime = async (id) => {
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?genres=${id}&page=1&order_by=score&sort=desc`)

        return response.data;
    } catch (error) {
        console.log(error)
    }
}