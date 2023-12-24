import ExcelSheetReader from '../services/ExcelSheetReader.js';
import EnvData from './EnvData.js';
import db from '../config/db.js';

class ExcelSheet {
    /**
     * @param {string} path 
     */
    constructor(username, path) {
        this.username = username;
        this.path = path;
    }

    /**
     * @param {string} typeName 
     */
    async getTypeId(typeName) {
        let sql = /*sql*/`select id from types where name LIKE ?`;
        const [result, _] = await db.execute(sql, [`%${typeName}%`]);
        return result[0].id;
    }
    
    async storeData() {
        const excelSheetReader = new ExcelSheetReader(this.path);
        const excelData = excelSheetReader.fetchExcelSheetData();
        for (let i = 0; i < excelData.length; i++) { 
            //! generate data JSON
            const data = {
                type: await this.getTypeId(excelData[i].type),
                value: excelData[i].value,
                source: excelData[i].source,
                description: excelData[i].description
            };

            //! generate location JSON
            const location = {
                country: excelData[i].country,
                city: excelData[i].city,
                town: excelData[i].town
            };

            //! generate EnvData object
            const envData = new EnvData(this.username,
                                        data,
                                        excelData[i].collected_date_time,
                                        location);
            
            //! try to add it
            try {
                envData.addEnvData(envData);

            } catch(error) {
                throw error;

            }
        }
    }
}

export default ExcelSheet;