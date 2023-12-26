import TimeStatistics from '../models/TimeStatistics.js';

export const getTimeStatistics = async (req, res, next) => { 
    const username = req.params.username
    try {
        const ts = new TimeStatistics(username);
        const [today, _1] = await ts.getInsertedDatToday();  
        const [lastWeek, _2] = await ts.getInsertedDataLastWeek();  
        const [lastMonth, _3] = await ts.getInsertedDataLastMonth();  
        const [lastYear, _4] = await ts.getInsertedDataLastYear();  
        res.status(200).json({ today : today[0].today_count,
                            lastWeek: lastWeek[0].last_week_count,
                            lastMonth: lastMonth[0].last_month_count,
                            lastYear: lastYear[0].last_year_count });

    } catch (error) {
        res.status(404).json({ message: 'User not found!' });

    }
};