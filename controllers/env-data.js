import EnvData from '../models/EnvData.js';
import ExcelSheet from '../models/ExcelSheet.js';
import { sendNotification } from './notification.js';

export const addEnvData = async (req, res, next) => { 
    const username = req.body.username;
    const data = req.body.data;
    const collectedDateTime = req.body.collectedDateTime;
    const location = req.body.location;
    try {
        const envData = new EnvData(username, data, collectedDateTime, location);
        await envData.addEnvData();
        await sendNotification();
        res.status(201).json( { message : 'The recored has been added successfully! '} );

    } catch(error) {
        res.status(400).json({ error: error.message });

    }
};

export const getAllEnvData = async (req, res, next) => {
    const [result, _] = await EnvData.getAllEnvData();
    if (result.length != 0) {
        res.status(200).json(result);

    } else {
        res.status(404).json({ message: 'No records found!' });
        
    }
};

export const getUserEnvData = async (req, res, next) => { 
    const username = req.params.username;
    const [result, _] = await EnvData.getUserEnvData(username);
    if (result.length !== 0) {
        res.status(200).json(result);

    } else {
        res.status(404).json({ message: 'User has no records!' });

    }
};

export const getEnvDataById = async (req, res, next) => { 
    const id = req.params.id;
    const [result, _] = await EnvData.getEnvDataById(id);
    if (result.length !== 0) {
        res.status(200).json(result[0]); 
    
    } else {
        res.status(404).json({ message: 'EnvData not found!' });
        
    }
};

export const deleteEnvData = async (req, res, next) => { 
    const id = req.params.id;
    const [result, _] = await EnvData.deleteEnvData(id);
    res.status(204).json({message : 'EnvData is deleted successfully!'});
};

export const updateEnvData = async (req, res, next) => { 
    const id = req.params.id;
    const info = req.body;
    try {
        await EnvData.updateEnvData(id, info);
        res.status(200).json( { message : 'The record has been updated successfully! '} );

    } catch (error) {
        res.status(400).json({ error: error.message });
        
    }
};

export const search = async (req, res, next) => {
    try {
        const fields = req.body;
        const [result, _] = await EnvData.search(fields);
        if (result.length!= 0) {
            res.status(200).json(result);
        
        } else {
            res.status(404).json({ message: 'EnvData not found!' });
            
        }

    } catch (error) { 
        res.status(400).json({ error: error.message });
        
    }
};

export const storeData = async (req, res, next) => {
    try {
        const username = req.body.username;
        const path = req.body.path
        const excelSheet = new ExcelSheet(username, path);
        excelSheet.storeData();
        res.status(200).json({ message: 'Data stored successfully' });

    } catch(error) {
        res.status(400).json({ message: error.message });
        
    }
};