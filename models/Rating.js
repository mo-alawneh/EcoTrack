import db from '../config/db.js';
import { InvalidRateError } from '../errors/rating.js';
import { RatingLimitations, TopUsers } from '../enums/rating.js';

class Rating {
    /**
     * @param {number} rating 
     */
    static isValidRate(rating) {
        return rating >= RatingLimitations.MIN_RATING
            && rating <= RatingLimitations.MAX_RATING;
    }
    
    /**
     * @param {string} username 
     * @param {string} username 
     * @param {number} rating 
     */
    static async rateUser(ratedUsername, raterUsername, rating) {
        if (!Rating.isValidRate(rating)) {
            throw new InvalidRateError();
        }

        let sql = /*sql*/`
            INSERT INTO ratings (rated_username, rater_username, rating)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE rating = VALUES(rating);
        `;

        return await db.execute(sql, [ratedUsername, raterUsername, rating]);
    }

    /**
     * @param {string} username 
     */
    static async getUserRating(username) {
        let sql = /*sql*/`
            SELECT COUNT(*) AS rating_count, COALESCE(SUM(rating), 0) AS rating_sum
            FROM ratings
            WHERE rated_username = ?;
        `;

        const [result, _] = await db.execute(sql, [username]);
        const { rating_count, rating_sum } = result[0];

        if (rating_count === 0) {
            return 0;

        } else {
            return rating_sum / rating_count;

        }
    }

    static async getTopRatedUsers() {
        let sql = /*sql*/`
            SELECT rated_username, AVG(rating) AS average_rating
            FROM ratings
            GROUP BY rated_username
            ORDER BY average_rating DESC
            LIMIT ?;
        `;

        return await db.execute(sql, [TopUsers.TOP_USERS_NUM]);
    }

}

export default Rating;