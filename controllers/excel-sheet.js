import ExcelSheet from '../models/ExcelSheet.js';

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