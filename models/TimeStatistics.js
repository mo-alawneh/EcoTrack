import db from '../config/db.js';

class TimeStatistics {
    constructor(username) {
        this.username = username;
    }

    async getInsertedDatToday() {
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
}

export default TimeStatistics;