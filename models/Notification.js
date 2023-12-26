import db from '../config/db.js';

class Notification {
    static async getNotififiedUsers() {
        const query = /*sql*/`
            SELECT
                intrests.username,
                intrests.type_id,
                intrests.threshold,
                intrests.country,
                intrests.city,
                intrests.town,
                env_data.value,
                users.email,
                types.unit,
                types.name AS type_name
            FROM intrests
            JOIN env_data ON intrests.type_id = env_data.type
            JOIN users ON intrests.username = users.username
            JOIN types ON env_data.type = types.id
            WHERE env_data.added_date = CURDATE()
                AND env_data.value > intrests.threshold`;

        return await db.execute(query);
    }
}

export default Notification;