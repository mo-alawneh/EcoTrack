import db from '../config/db.js';

class Report {
    /**
     * @param {username} username 
     */
    static async getUserScoreAndRating(username) {
        let sql = /*sql*/`SELECT users.username, users.score, AVG(ratings.rating) as average_rating 
                                FROM users 
                                LEFT JOIN ratings ON users.username = ratings.rated_username 
                                WHERE users.username = ? 
                                GROUP BY users.username`;

        return await db.execute(sql, [username]);
    }

    /**
     * @param {username} username 
     */
    static async getUserEnvData(username) { 
        let sql = /*sql*/ `SELECT env_data.*, types.name AS type_name
        FROM env_data
        LEFT JOIN types ON env_data.type = types.id
        WHERE env_data.username = ?`;

        return await db.execute(sql, [username]);
    }
}

export default Report;