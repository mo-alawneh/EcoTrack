import xlsx from 'xlsx';

class ExcelSheetReader {

    /**
     * @param {string} path 
     */
    constructor(path) {
        this.path = path;
    }

    fetchExcelSheetData() {
        const workbook = xlsx.readFile(this.path);
        let workbook_sheet = workbook.SheetNames;
        let workbook_response = xlsx.utils.sheet_to_json(
            workbook.Sheets[workbook_sheet[0]]
        );

        return workbook_response;
    }
}

export default ExcelSheetReader;