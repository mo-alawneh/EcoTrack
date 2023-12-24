import Rating from '../models/Rating.js';
import  { InvalidRateError } from '../errors/rating.js';

export const rateUser = async (req, res, next) => { 
    try {
        const { ratedUsername, raterUsername, rating } = req.body;
        const result = await Rating.rateUser(ratedUsername, raterUsername, rating);
        res.status(201).json(result);

    } catch (error) {
        if (error instanceof InvalidRateError) {
            res.status(400).json({ error: error.message });

        }
    }
};

export const calculateUserRating = async (req, res, next) => { 
    const username = req.params.username;
    const result = await Rating.calculateUserRating(username);
    res.status(200).json(result);
};

export const getTopRatedUsers = async (req, res, next) => {
    const result = await Rating.getTopRatedUsers();
    res.status(200).json(result);
};