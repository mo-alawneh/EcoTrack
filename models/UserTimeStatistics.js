import db from '../config/db.js';

class UserTimeStatistics {
    /**
     * @param {string} username 
     */
    constructor(username) {
        this.username = username;
    }

    async getInsertedDataToday() {
        let sql = `SELECT COUNT(*) AS today_count
                    FROM env_data
                    WHERE username = ?
                    AND DATE(added_date) = CURRENT_DATE`;

        return await db.execute(sql, [this.username]);
    }

    async getInsertedDataLastWeek() {
        let sql = `SELECT COUNT(*) AS last_week_count
                    FROM env_data
                    WHERE username = ?
                    AND added_date BETWEEN CURRENT_DATE - INTERVAL 1 WEEK AND CURRENT_DATE - INTERVAL 1 DAY`;

        return await db.execute(sql, [this.username]);
    }

    async getInsertedDataLastMonth() {
        let sql = `SELECT COUNT(*) AS last_month_count
                    FROM env_data
                    WHERE username = ?
                    AND added_date BETWEEN CURRENT_DATE - INTERVAL 1 MONTH AND CURRENT_DATE - INTERVAL 1 DAY`;

        return await db.execute(sql, [this.username]);
    }

    async getInsertedDataLastYear() {
        let sql = `SELECT COUNT(*) AS last_year_count
                    FROM env_data
                    WHERE username = ?
                    AND added_date BETWEEN CURRENT_DATE - INTERVAL 1 YEAR AND CURRENT_DATE - INTERVAL 1 DAY`;

        return await db.execute(sql, [this.username]);
    }

    async getInsertedDataTodayForIssues() {
        let sql = `SELECT COUNT(*) AS today_count
                    FROM issues
                    WHERE username = ?
                    AND DATE(date) = CURRENT_DATE`;
    
        return await db.execute(sql, [this.username]);
    }
    
    async getInsertedDataLastWeekForIssues() {
        let sql = `SELECT COUNT(*) AS last_week_count
                    FROM issues
                    WHERE username = ?
                    AND date BETWEEN CURRENT_DATE - INTERVAL 1 WEEK AND CURRENT_DATE - INTERVAL 1 DAY`;
    
        return await db.execute(sql, [this.username]);
    }
    
    async getInsertedDataLastMonthForIssues() {
        let sql = `SELECT COUNT(*) AS last_month_count
                    FROM issues
                    WHERE username = ?
                    AND date BETWEEN CURRENT_DATE - INTERVAL 1 MONTH AND CURRENT_DATE - INTERVAL 1 DAY`;
    
        return await db.execute(sql, [this.username]);
    }
    
    async getInsertedDataLastYearForIssues() {
        let sql = `SELECT COUNT(*) AS last_year_count
                    FROM issues
                    WHERE username = ?
                    AND date BETWEEN CURRENT_DATE - INTERVAL 1 YEAR AND CURRENT_DATE - INTERVAL 1 DAY`;
    
        return await db.execute(sql, [this.username]);
    }

    async getInsertedDataTodayForResources() {
        let sql = `SELECT COUNT(*) AS today_count
                    FROM resources
                    WHERE username = ?
                    AND DATE(date) = CURRENT_DATE`;
    
        return await db.execute(sql, [this.username]);
    }
    
    async getInsertedDataLastWeekForResources() {
        let sql = `SELECT COUNT(*) AS last_week_count
                    FROM resources
                    WHERE username = ?
                    AND date BETWEEN CURRENT_DATE - INTERVAL 1 WEEK AND CURRENT_DATE - INTERVAL 1 DAY`;
    
        return await db.execute(sql, [this.username]);
    }
    
    async getInsertedDataLastMonthForResources() {
        let sql = `SELECT COUNT(*) AS last_month_count
                    FROM resources
                    WHERE username = ?
                    AND date BETWEEN CURRENT_DATE - INTERVAL 1 MONTH AND CURRENT_DATE - INTERVAL 1 DAY`;
    
        return await db.execute(sql, [this.username]);
    }
    
    async getInsertedDataLastYearForResources() {
        let sql = `SELECT COUNT(*) AS last_year_count
                    FROM resources
                    WHERE username = ?
                    AND date BETWEEN CURRENT_DATE - INTERVAL 1 YEAR AND CURRENT_DATE - INTERVAL 1 DAY`;
    
        return await db.execute(sql, [this.username]);
    }    
}

export default UserTimeStatistics;