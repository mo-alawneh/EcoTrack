import db from '../config/db.js';

class Intrest {
    /**
     * @param {string} username 
     * @param {number} typeId 
     * @param {number} thresold 
     * @param {JSON} location
     */
    constructor(username, typeId, threshold, location) {
        this.username = username;
        this.typeId = typeId;
        this.threshold = threshold;
        const { country, city, town } = location;
        this.country = country;
        this.city = city;
        this.town = town;
    }

    async addIntrest() { 
        let sql = /*sql*/`insert into intrests(username, type_id, threshold, country, city, town) values (?, ?, ?, ?, ?, ?)`;
        return await db.execute(sql, [this.username, 
                                    this.typeId, 
                                    this.threshold,
                                    this.country,
                                    this.city,
                                    this.town]);
    }

    /**
     * @param {string} username 
     */
    static async getAllUserIntrests(username) {
        let sql = /*sql*/`select * from intrests where username = ?`;
        return await db.execute(sql, [username]);
    }

    /**
     * @param {number} id 
     */
    static async getIntrestById(id) {
        let sql = /*sql*/`select * from intrests where id = ?`;
        return await db.execute(sql, [id]);
    }

    /**
     * @param {number} id 
     */
    static async deleteIntrest(id) { 
        let sql = /*sql*/`delete from intrests where id = ?`;
        return await db.execute(sql, [id]);
    }

    /**
     * @param {number} id 
     * @param {JSON} info 
     */
    static async updateUserIntrest(id, info) {
        const { typeId, threshold, location } = info;
    
        let updateClauses = [];
    
        if (typeId !== undefined) {
            updateClauses.push({ field: 'type_id', value: typeId });
        }
    
        if (threshold !== undefined) {
            updateClauses.push({ field: 'threshold', value: threshold });
        }
    
        if (location !== undefined) {
            const { country, city, street } = location;
    
            if (country !== undefined) {
                updateClauses.push({ field: 'country', value: country });
            }
    
            if (city !== undefined) {
                updateClauses.push({ field: 'city', value: city });
            }
    
            if (street !== undefined) {
                updateClauses.push({ field: 'street', value: street });
            }
        }
    
        if (updateClauses.length === 0) {
            //! No updates to perform
            return;
        }
    
        const setStatements = updateClauses.map(({ field }) => `${field} = ?`).join(', ');
        const values = updateClauses.map(({ value }) => value);
    
        const sql = `UPDATE Interests SET ${setStatements} WHERE id = ?`;
        return await db.execute(sql, [...values, id]);
    }

    /**
     * @param {JSON} fields 
     */
    static async search(fields) {
        let query = /*sql*/`SELECT * FROM Interests WHERE 1`;
    
        const { typeId, threshold, location } = fields;
    
        if (typeId !== undefined) {
            query += /*sql*/` AND type_id = ?`;
        }
    
        if (threshold !== undefined) {
            query += /*sql*/` AND threshold = ?`;
        }
    
        if (location !== undefined) {
            const { country, city, street } = location;
    
            if (country !== undefined) {
                query += /*sql*/` AND country = ?`;
            }
    
            if (city !== undefined) {
                query += /*sql*/` AND city = ?`;
            }
    
            if (street !== undefined) {
                query += /*sql*/` AND street = ?`;
            }
        }
    
        return await db.execute(query, Object.values(fields).filter(value => value !== undefined));
    }
    
}

export default Intrest;