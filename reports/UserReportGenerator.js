import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import Report from '../models/Report.js';
import fs from 'fs';

//! Function to read the HTML content from the file
const readHtmlTemplate = filename => {
    try {
        return fs.readFileSync(filename, 'utf-8');

    } catch (error) {
        console.error('Error reading HTML template:', error);
        return null;
        
    }
};

class UserReportGenerator {
    /**
     * @param {username} username 
     */
    static async getUserReport(username) {
        //! Get the user data
        const [result, _1] = await Report.getUserScoreAndRating(username);
        const [envData, _2] = await Report.getUserEnvData(username);

        //! Combine user data and environmental data
        const userData = { ...result[0], envData };

        //! Read the HTML content from the file
        const htmlTemplate = readHtmlTemplate('resources\\html\\user-report.html');

        if (htmlTemplate) {
            //! Build html report
            const template = handlebars.compile(htmlTemplate);
            const htmlContent = template({ userData });

            //! Generate PDF report
            await UserReportGenerator.generatePDF(username, htmlContent);
        }
    }

    /**
     * @param {HTML} htmlContent 
     */
    static async generatePDF(username, htmlContent) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
      
        await page.setContent(htmlContent);
      
        //! Adjust the PDF generation options as needed
        await page.pdf({ path: `out\\${username}.pdf`, format: 'A4' });
      
        await browser.close();
    }
}

export default UserReportGenerator;