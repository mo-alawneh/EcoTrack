import UserReportGenerator from '../reports/UserReportGenerator.js';

export const generateUserReport = async (req, res, next) => { 
    const { username } = req.params;
    try {
        UserReportGenerator.getUserReport(username);
        res.status(200).json( { message : 'User Report Generated', path : `out/${username}.pdf`});

    } catch (error) {
        res.status(404).json( { message : 'User not found!' });

    }
};