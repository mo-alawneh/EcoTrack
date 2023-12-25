import Type from '../models/Type.js';

export const addType = async (req, res, next) => { 
    try {
        const { name, unit, description, overall_category } = req.body;
        const type = new Type(name, unit, description, overall_category);
        const [result, _] = await type.addType();
        res.status(201).json(result);

    } catch(error) {
        res.status(400).json({ error: error.message });
        
    }
};

export const getAllTypes = async (req, res, next) => {
    const [types, _] = await Type.getAllTypes();
    if (types.length != 0) {
        res.status(200).json(types);

    } else {
        res.status(404).json({ message : "There are no types!"});

    }
};

export const getTypeById = async (req, res, next) => { 
    const id = req.params.id;
    const [type, _] = await Type.getTypeById(id);
    if (type.length != 0) {
        res.status(200).json(type);

    } else {
        res.status(404).json({ message: 'Type not found!'});

    }
}

export const deleteType = async (req, res, next) => { 
    const id = req.params.id;
    const [result, _] = await Type.deleteType(id);
    res.status(204).json({message : 'Type is deleted successfully!'});
}

export const updateType = async (req, res, next) => { 
    const id = req.params.id;
    const info = req.body;
    try {
        const [result, _] = await Type.updateType(id, info);
        res.status(200).json(result);

    } catch(error) {
        res.status(400).json({ error: error.message });

    }
}

export const search = async (req, res, next) => {
    const fields = req.body;
    const [types, _] = await Type.search(fields);
    if (types.length != 0) {
        res.status(200).json(types);

    } else {
        res.status(404).json({ message: 'Type not found!'});

    }
}

export const getAllDirtyTypes = async (req, res, next) => { 
    const [types, _] = await Type.getAllDirtyTypes();
    if (types.length!= 0) {
        res.status(200).json(types);

    } else {
        res.status(404).json({ message: 'There are no dirty types!'});

    }
};

export const acceptType = async (req, res, next) => { 
    const id = req.params.id;
    const username = req.body.username;
    try {
        const [result, _] = await Type.accpetType(id, username);
        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(403).json({ error: error.message }); //! Access denied

    }
};

export const rejectType = async (req, res, next) => { 
    const id = req.params.id;
    const username = req.body.username;
    try {
        const [result, _] = await Admin.rejectType(id, username);
        res.status(200).json(result);

    } catch(error) {
        res.status(403).json({ error: error.message }); //! Access denied
        
    }
};