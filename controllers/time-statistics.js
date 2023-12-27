import UserTimeStatistics from '../models/UserTimeStatistics.js';
import TimeStatistics from '../models/TimeStatistics.js';

export const getUserTimeStatistics = async (req, res, next) => { 
    const username = req.params.username
    try {
        const ts = new UserTimeStatistics(username);
        const [today, _d1] = await ts.getInsertedDataToday();  
        const [lastWeek, _d2] = await ts.getInsertedDataLastWeek();  
        const [lastMonth, _d3] = await ts.getInsertedDataLastMonth();  
        const [lastYear, _d4] = await ts.getInsertedDataLastYear();  
        const envData = {
            today: today[0].today_count,
            lastWeek: lastWeek[0].last_week_count,
            lastMonth: lastMonth[0].last_month_count,
            lastYear: lastYear[0].last_year_count
        };

        const [resourceToday, _r1] = await ts.getInsertedDataTodayForResources();
        const [resourceLastWeek, _r2] = await ts.getInsertedDataLastWeekForResources();
        const [resourceLastMonth, _r3] = await ts.getInsertedDataLastMonthForResources();
        const [resourceLastYear, _r4] = await ts.getInsertedDataLastYearForResources();
        const resourceData = {
            today: resourceToday[0].today_count,
            lastWeek: resourceLastWeek[0].last_week_count,
            lastMonth: resourceLastMonth[0].last_month_count,
            lastYear: resourceLastYear[0].last_year_count
        };

        const [issueToday, _i1] = await ts.getInsertedDataTodayForIssues();
        const [issueLastWeek, _i2] = await ts.getInsertedDataLastWeekForIssues();
        const [issueLastMonth, _i3] = await ts.getInsertedDataLastMonthForIssues();
        const [issueLastYear, _i4] = await ts.getInsertedDataLastYearForIssues();

        const issueData = {
            today: issueToday[0].today_count,
            lastWeek: issueLastWeek[0].last_week_count,
            lastMonth: issueLastMonth[0].last_month_count,
            lastYear: issueLastYear[0].last_year_count
        };

        res.status(200).json({ envData, resourceData, issueData });

    } catch (error) {
        res.status(404).json({ message: 'User not found!' });

    }
};

export const getTimeStatistics = async (req, res, next) => { 
    try {
        const [today, _d1] = await TimeStatistics.getInsertedDataToday();  
        const [lastWeek, _d2] = await TimeStatistics.getInsertedDataLastWeek();  
        const [lastMonth, _d3] = await TimeStatistics.getInsertedDataLastMonth();  
        const [lastYear, _d4] = await TimeStatistics.getInsertedDataLastYear();  
        const envData = {
            today: today[0].today_count,
            lastWeek: lastWeek[0].last_week_count,
            lastMonth: lastMonth[0].last_month_count,
            lastYear: lastYear[0].last_year_count
        };

        const [resourceToday, _r1] = await TimeStatistics.getInsertedDataTodayForResources();
        const [resourceLastWeek, _r2] = await TimeStatistics.getInsertedDataLastWeekForResources();
        const [resourceLastMonth, _r3] = await TimeStatistics.getInsertedDataLastMonthForResources();
        const [resourceLastYear, _r4] = await TimeStatistics.getInsertedDataLastYearForResources();
        const resourceData = {
            today: resourceToday[0].today_count,
            lastWeek: resourceLastWeek[0].last_week_count,
            lastMonth: resourceLastMonth[0].last_month_count,
            lastYear: resourceLastYear[0].last_year_count
        };

        const [issueToday, _i1] = await TimeStatistics.getInsertedDataTodayForIssues();
        const [issueLastWeek, _i2] = await TimeStatistics.getInsertedDataLastWeekForIssues();
        const [issueLastMonth, _i3] = await TimeStatistics.getInsertedDataLastMonthForIssues();
        const [issueLastYear, _i4] = await TimeStatistics.getInsertedDataLastYearForIssues();

        const issueData = {
            today: issueToday[0].today_count,
            lastWeek: issueLastWeek[0].last_week_count,
            lastMonth: issueLastMonth[0].last_month_count,
            lastYear: issueLastYear[0].last_year_count
        };

        res.status(200).json({ envData, resourceData, issueData });

    } catch (error) {
        res.status(404).json({ message: 'Data not found!' });

    }
};
