import Intrest from '../models/Intrest.js';

export const addIntrest = async (req, res, next) => { 
    const { username, typeId, threshold, location } = req.body;
    const intrest = new Intrest(username, typeId, threshold, location);
    const [result, _] = await intrest.addIntrest();
    res.status(201).json(result);
}

export const getAllUserIntrests = async (req, res, next) => { 
    const { username } = req.params;
    const [intrests, _] = await Intrest.getAllUserIntrests(username);
    if (intrests.length != 0) {
        res.status(200).json(intrests);

    } else {
        res.status(404).json({message: 'No intrests were found!'});

    }
}

export const getIntrestById = async (req, res, next) => { 
    const { id } = req.params;
    const [intrest, _] = await Intrest.getIntrestById(id);
    if (intrest.length != 0) {
        res.status(200).json(intrest);

    } else {
        res.status(404).json({message: 'Intrest not found!'});

    }
}

export const deleteIntrest = async (req, res, next) => { 
    const { id } = req.params;
    const [result, _] = await Intrest.deleteIntrest(id);
    res.status(204).json({ message: 'Intrest deleted successfully' });
}

export const updateUserIntrest = async (req, res, next) => { 
    const { id } = req.params;
    const [result, _] = await Intrest.updateUserIntrest(id, req.body);
    res.status(200).json(result);
}

export const search = async (req, res, next) => { 
    const fields = req.body;
    const [intrests, _] = await Intrest.search(fields);
    if (intrests.length != 0) {
        res.status(200).json(intrests);

    } else {
        res.status(404).json({message: 'No intrests were found!'});

    }
}