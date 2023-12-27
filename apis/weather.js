import axios from 'axios';
import { API_KEYS } from '../config/api-keys.js';

export async function getCoordinates(location) {
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${API_KEYS.OPEN_CAGE_DATA}`;

    return new Promise((resolve, reject) => {
        axios.get(apiUrl)
            .then(response => {
                const coordinates = response.data.results[0].geometry;
                resolve(coordinates);
            })
            .catch(error => {
                reject(error.response ? error.response.data : error.message);
            });
    });
}

export async function getWeather(coordinates) {
    const { lat, lng } = coordinates;
    const openWeatherApiUrl = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${API_KEYS.OPEN_WEATHER}&include=minutely`;

    return axios.get(openWeatherApiUrl)
        .then(response => {
            return response.data; // Adjust as needed based on OpenWeatherMap API response structure
        })
        .catch(error => {
            throw error.response ? error.response.data : error.message;
        });
}