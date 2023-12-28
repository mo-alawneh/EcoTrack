import Intrest from '../models/Intrest.js';

export const addIntrest = async (req, res, next) => { 
    try {
        const { username, typeId, threshold, location } = req.body;
        const intrest = new Intrest(username, typeId, threshold, location);
        await intrest.addIntrest();
        res.status(201).json( { message : 'Intrest has been added successfully! '} );

    } catch(error) {
        res.status(400).json({ error: error.message });

    }
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
        res.status(200).json(intrest[0]);

    } else {
        res.status(404).json({message: 'Intrest not found!'});

    }
}

export const deleteIntrest = async (req, res, next) => { 
    const { id } = req.params;
    await Intrest.deleteIntrest(id);
    res.status(204).json({ message: 'Intrest deleted successfully' });
}

export const updateUserIntrest = async (req, res, next) => { 
    try {
        const { id } = req.params;
        await Intrest.updateUserIntrest(id, req.body);
        res.status(200).json( { message : 'Intrest has been updated successfully!' } );

    } catch (error) {
        res.status(400).json({ error: error.message });
        
    }
}

export const search = async (req, res, next) => { 
    try {
        const fields = req.body;
        const [intrests, _] = await Intrest.search(fields);
        if (intrests.length != 0) {
            res.status(200).json(intrests);

        } else {
            res.status(404).json({message: 'No intrests were found!'});

        }

    } catch (error) {
        res.status(400).json({ menubar: error.message });
        
    }
}