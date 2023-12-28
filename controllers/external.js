import { getCoordinates, getWeather } from '../apis/weather.js';
import { getEnvironmentalArticles } from '../apis/articles.js';
import User from '../models/User.js';

export const fetchWeather = async (req, res, next) => {
    try {
        const username = req.params.username;
        const [user, _] = await User.getUserByUsername(username);
        const { country, city } = user[0];
        const location = city + ', ' + country;
        getCoordinates(location)
        .then(coordinates => {
            return getWeather(coordinates);
        })
        .then(weatherData => {
            res.status(200).json(weatherData.data[0]);
        })
        .catch(error => {
            res.status(400).json( { error : error.message } );
        });

    } catch(error) {
        res.status(400).json( { error : error.message } );
    }

};

export const fetchArticles = async (req, res, next) => { 
    try {
        const topic = req.params.topic;
        getEnvironmentalArticles(topic)
        .then(articles => {
            res.status(200).json(articles);
        })
        .catch(error => {
            res.status(400).json( { error : error.message } );
        });
    } catch(error) {
        res.status(400).json( { error : error.message } );
    }
};