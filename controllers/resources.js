import Resource from '../models/Resource.js';

export const addResource = async (req, res, next) => { 
    const { username, title, description, link } = req.body;
    const resource = new Resource(username, title, description, link);
    const [result, _] = await resource.addResource();
    res.status(201).json(result);
};

export const getAllResources = async (req, res, next) => { 
    const [resources, _] = await Resource.getAllResources();
    if (resources.length != 0) {
        res.status(200).json(resources);

    } else {
        res.status(404).json({ message: 'No resources found' });

    }
};

export const getAllUserResources = async (req, res, next) => { 
    const username = req.params.username;
    const [resources, _] = await Resource.getAllUserResources(username);
    if (resources.length != 0) {
        res.status(200).json(resources);

    } else {
        res.status(404).json({ message: 'No resources found' });

    }
};

export const getResourceById = async (req, res, next) => { 
    const id = req.params.id;
    const [resource, _] = await Resource.getResourceById(id);
    if (resource) {
        res.status(200).json(resource); 

    } else {
        res.status(404).json({ message: 'No resource found' });

    }
};

export const deleteResource = async (req, res, next) => { 
    try {
        const id = req.params.id;
        const [result, _] = await Resource.deleteResource(id);
        res.status(204).json({ message: 'Resource deleted successfully!' });

    } catch (error) {
        res.status(404).json({ message: error.message });

    }
};

export const updateResource = async (req, res, next) => { 
    try {
        const id = req.params.id;
        const info = req.body;
        const [result, _] = await Resource.updateResource(id, info);
        res.status(200).json(result);

    } catch(error) { 
        res.status(400).json({ message: error.message });

    }
};

export const search = async (req, res, next) => { 
    const fields = req.body;
    const [resources, _] = await Resource.search(fields);
    if (resources.length != 0) {
        res.status(200).json(resources);

    } else {
        res.status(404).json({ message: 'No resources found' });
        
    }
};

export const getRecentResources = async (req, res, next) => { 
    const [resources, _] = await Resource.getRecentResources();
    if (resources.length!= 0) {
        res.status(200).json(resources); 
    
    } else {
        res.status(404).json({ message: 'No resources found' }); 
        
    }
};