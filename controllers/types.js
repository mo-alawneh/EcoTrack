import Type from '../models/Type.js';

export const addType = async (req, res, next) => { 
    try {
        const { name, unit, description, overall_category } = req.body;
        const type = new Type(name, unit, description, overall_category);
        const [result, _] = await type.addType();
        res.status(201).json( { message : 'Type is created successfully!'} );

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
        res.status(200).json(type[0]);

    } else {
        res.status(404).json({ message: 'Type not found!'});

    }
}

export const deleteType = async (req, res, next) => { 
    const id = req.params.id;
    await Type.deleteType(id);
    res.status(204).json({message : 'Type is deleted successfully!'});
}

export const updateType = async (req, res, next) => { 
    const id = req.params.id;
    const info = req.body;
    try {
        await Type.updateType(id, info);
        res.status(200).json( { message : 'Type is updated successfully! ' } );

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

export const getAllAcceptedTypes = async (req, res, next) => { 
    const [types, _] = await Type.getAllAcceptedTypes();
    if (types.length!= 0) {
        res.status(200).json(types); 
    
    } else {
        res.status(404).json({ message: 'There are no accepted types!'});
        
    }
};

export const acceptType = async (req, res, next) => { 
    const id = req.params.id;
    const username = req.body.username;
    try {
        await Type.accpetType(id, username);
        res.status(200).json( { message: 'Type has been accepted!' } );

    } catch (error) {
        console.log(error);
        res.status(403).json({ error: error.message }); //! Access denied

    }
};

export const rejectType = async (req, res, next) => { 
    const id = req.params.id;
    const username = req.body.username;
    try {
        await Type.rejectType(id, username);
        res.status(200).json( { message : 'Type has been rejected !' } );

    } catch(error) {
        res.status(403).json({ error: error.message }); //! Access denied
        
    }
};