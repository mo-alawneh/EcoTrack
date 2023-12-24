import Admin from '../models/Admin.js';

export const getAllDirtyTypes = async (req, res, next) => { 
    const [types, _] = await Admin.getAllDirtyTypes();
    if (types.length!= 0) {
        res.status(200).json(types);

    } else {
        res.status(404).json({ message: 'There are no dirty types!'});

    }
};

export const acceptType = async (req, res, next) => { 
    const id = req.params.id;
    const [result, _] = await Admin.accpetType(id);
    res.status(200).json(result);
};

export const rejectType = async (req, res, next) => { 
    const id = req.params.id;
    const [result, _] = await Admin.rejectType(id);
    res.status(200).json(result);
};