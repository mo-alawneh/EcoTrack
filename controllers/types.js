import Type from '../models/Type.js';

export const addType = async (req, res, next) => { 
    try {
        const { name, description, overall_category } = req.body;
        const type = new Type(name, description, overall_category);
        const [result, _] = await type.addType();
        res.status(201).json(result);

    } catch(error) {
        res.status(409).json({ error: 'Already used name!' });

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
    const [result, _] = await Type.updateType(id, info);
    res.status(200).json(result);
}

export const search = async (req, res, next) => {
    const fields = req.body;
    const [types, _] = await Type.searchTypes(fields);
    if (types.length != 0) {
        res.status(200).json(types);

    } else {
        res.status(404).json({ message: 'Type not found!'});

    }
}