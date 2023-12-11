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

    eliminateEmptyRows() {
        const workbook_response = this.fetchExcelSheetData();

        //! slice the 
        let i;
        for (i = 0; i < workbook_response.length; i++) { 
            if (workbook_response[i].type == null || workbook_response[i].value == null || workbook_response[i].date == null) {
                break;
            }
        }
        return workbook_response.slice(0, i);
    }

    readExcelSheet() {
        return this.eliminateEmptyRows();
    }
}

export default ExcelSheetReader;