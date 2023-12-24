import { TypeStatus } from '../enums/type.js';
import db from '../config/db.js';

class Admin {
    static async getAllDirtyTypes() {
        let sql = /*sql*/`SELECT * FROM types WHERE status = ?`;
        return await db.execute(sql, [TypeStatus.DIRTY]);
    }

    /**
     * @param {number} id 
     */
    static async accpetType(id) {
        let sql = /*sql*/`UPDATE types SET status = ? WHERE id = ?`;
        return await db.execute(sql, [TypeStatus.ACCEPTED, id]);
    }

    /**
     * @param {number} id 
     */
    static async rejectType(id) { 
        let sql = /*sql*/`UPDATE types SET status = ? WHERE id = ?`;
        return await db.execute(sql, [TypeStatus.REJECTED, id]);
    }
}

export default Admin;