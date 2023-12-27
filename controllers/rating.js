import Rating from '../models/Rating.js';

export const rateUser = async (req, res, next) => { 
    try {
        const { ratedUsername, raterUsername, rating } = req.body;
        const result = await Rating.rateUser(ratedUsername, raterUsername, rating);
        res.status(201).json( { message : 'User is rated successfully!' } );

    } catch (error) {
        res.status(400).json({ error: error.message });
        
    }
};

export const calculateUserRating = async (req, res, next) => { 
    const username = req.params.username;
    const result = await Rating.getUserRating(username);
    res.status(200).json( { rate : result } );
};

export const getTopRatedUsers = async (req, res, next) => {
    const [result, _] = await Rating.getTopRatedUsers();
    if (result.length != 0) {
        res.status(200).json(result);

    } else {
        res.status(404).json({ error: 'No users found!' });

    }
};

export const countRatingClasses = async (req, res, next) => {
    const result = await Rating.countRatingClasses();
    res.status(200).json(result);
};