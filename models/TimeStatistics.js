import db from '../config/db.js';

class TimeStatistics {
    static async getInsertedDataToday() {
        let sql = `SELECT COUNT(*) AS today_count
                    FROM env_data
                    WHERE DATE(added_date) = CURRENT_DATE`;
    
        return await db.execute(sql);
    }
    
    static async getInsertedDataLastWeek() {
        let sql = `SELECT COUNT(*) AS last_week_count
                    FROM env_data
                    WHERE added_date BETWEEN CURRENT_DATE - INTERVAL 1 WEEK AND CURRENT_DATE - INTERVAL 1 DAY`;
    
        return await db.execute(sql);
    }
    
    static async getInsertedDataLastMonth() {
        let sql = `SELECT COUNT(*) AS last_month_count
                    FROM env_data
                    WHERE added_date BETWEEN CURRENT_DATE - INTERVAL 1 MONTH AND CURRENT_DATE - INTERVAL 1 DAY`;
    
        return await db.execute(sql);
    }
    
    static async getInsertedDataLastYear() {
        let sql = `SELECT COUNT(*) AS last_year_count
                    FROM env_data
                    WHERE added_date BETWEEN CURRENT_DATE - INTERVAL 1 YEAR AND CURRENT_DATE - INTERVAL 1 DAY`;
    
        return await db.execute(sql);
    }

    static async getInsertedDataTodayForIssues() {
        let sql = `SELECT COUNT(*) AS today_count
                    FROM issues
                    WHERE DATE(date) = CURRENT_DATE`;
    
        return await db.execute(sql);
    }
    
    static async getInsertedDataLastWeekForIssues() {
        let sql = `SELECT COUNT(*) AS last_week_count
                    FROM issues
                    WHERE date BETWEEN CURRENT_DATE - INTERVAL 1 WEEK AND CURRENT_DATE - INTERVAL 1 DAY`;
    
        return await db.execute(sql);
    }
    
    static async getInsertedDataLastMonthForIssues() {
        let sql = `SELECT COUNT(*) AS last_month_count
                    FROM issues
                    WHERE date BETWEEN CURRENT_DATE - INTERVAL 1 MONTH AND CURRENT_DATE - INTERVAL 1 DAY`;
    
        return await db.execute(sql);
    }
    
    static async getInsertedDataLastYearForIssues() {
        let sql = `SELECT COUNT(*) AS last_year_count
                    FROM issues
                    WHERE date BETWEEN CURRENT_DATE - INTERVAL 1 YEAR AND CURRENT_DATE - INTERVAL 1 DAY`;
    
        return await db.execute(sql);
    }

    static async getInsertedDataTodayForResources() {
        let sql = `SELECT COUNT(*) AS today_count
                    FROM resources
                    WHERE DATE(date) = CURRENT_DATE`;
    
        return await db.execute(sql);
    }
    
    static async getInsertedDataLastWeekForResources() {
        let sql = `SELECT COUNT(*) AS last_week_count
                    FROM resources
                    WHERE date BETWEEN CURRENT_DATE - INTERVAL 1 WEEK AND CURRENT_DATE - INTERVAL 1 DAY`;
    
        return await db.execute(sql);
    }
    
    static async getInsertedDataLastMonthForResources() {
        let sql = `SELECT COUNT(*) AS last_month_count
                    FROM resources
                    WHERE date BETWEEN CURRENT_DATE - INTERVAL 1 MONTH AND CURRENT_DATE - INTERVAL 1 DAY`;
    
        return await db.execute(sql);
    }
    
    static async getInsertedDataLastYearForResources() {
        let sql = `SELECT COUNT(*) AS last_year_count
                    FROM resources
                    WHERE date BETWEEN CURRENT_DATE - INTERVAL 1 YEAR AND CURRENT_DATE - INTERVAL 1 DAY`;
    
        return await db.execute(sql);
    }    
}

export default TimeStatistics;