import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import Report from '../models/Report.js';
import UserTimeStatistics from '../models/UserTimeStatistics.js';
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
        const report = new Report(username);
        const [result, _1] = await report.getUserScoreAndRating();
        const [envData, _2] = await report.getUserEnvData();
        const [issues, _3] = await report.getUserIssues();
        const [resources, _4] = await report.getUserResources();

        const uts = new UserTimeStatistics(username);

        const [lastMonthData, d1] = await uts.getInsertedDataLastMonth();
        const month1 = lastMonthData[0].last_month_count;
        const [lastYearData, d2] = await uts.getInsertedDataLastYear();
        const year1 = lastYearData[0].last_year_count;

        const [lastMonthIssues, i1] = await uts.getInsertedDataLastMonthForIssues();
        const month2 = lastMonthIssues[0].last_month_count;
        const [lastYearIssues, i2] = await uts.getInsertedDataLastYearForIssues();
        const year2 = lastYearIssues[0].last_year_count;

        const [lastMonthResources, r1] = await uts.getInsertedDataLastMonthForResources();
        const month3 = lastMonthResources[0].last_month_count;
        const [lastYearResources, r2] = await uts.getInsertedDataLastYearForResources();
        const year3 = lastYearResources[0].last_year_count;


        //! Combine user data and environmental data
        const userData = { ...result[0], envData, issues, resources, month1, year1, month2, year2, month3, year3 };

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