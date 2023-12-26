import Notification from '../models/Notification.js';
import EmailSender from '../services/EmailSender.js';
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

export const sendNotification = async () => {
    const [result, _] = await Notification.getNotififiedUsers();

    for (let i = 0; i < result.length; i++) {         
        //! Read the HTML content from the file
        const htmlTemplate = readHtmlTemplate('resources\\html\\notification-email.html');

        if (htmlTemplate) {
            //! Destructure attributes from the result[i] object
            const { username, type_id, threshold, country, city, town, value, email, type_name } = result[i];

            //! Use the attributes in your emailOptions
            const emailOptions = {
                to: email,
                subject: 'Eco-Track Notification',
                html: htmlTemplate.replace(/{{(.*?)}}/g, (match, p1) => {
                    const attributeValue = result[i][p1.trim()];
                    return attributeValue !== undefined ? attributeValue : '';
                })
            };

            EmailSender.sendEmail(emailOptions);
        }
    }
};