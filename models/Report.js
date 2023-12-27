import db from '../config/db.js';

class Report {
    /**
     * @param {string} username 
     */
    constructor(username) {
        this.username = username;
    }

    async getUserScoreAndRating() {
        let sql = /*sql*/`SELECT users.username, users.score, AVG(ratings.rating) as average_rating 
                                FROM users 
                                LEFT JOIN ratings ON users.username = ratings.rated_username 
                                WHERE users.username = ? 
                                GROUP BY users.username`;

        return await db.execute(sql, [this.username]);
    }

    async getUserEnvData() { 
        let sql = /*sql*/ `SELECT env_data.*, types.name AS type_name
        FROM env_data
        LEFT JOIN types ON env_data.type = types.id
        WHERE env_data.username = ?`;

        return await db.execute(sql, [this.username]);
    }

    async getUserIssues() {
        let sql = /*sql*/ `SELECT id, name, description, country, city, town, assessment, date
        FROM issues
        WHERE username = ?`;
    
        return await db.execute(sql, [this.username]);
    }

    async getUserResources() {
        let sql = /*sql*/ `SELECT resources.*
        FROM resources
        WHERE resources.username = ?`;

        return await db.execute(sql, [this.username]);
    }
}

export default Report;