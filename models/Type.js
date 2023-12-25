import { OverallCategory, TypeStatus } from '../enums/type.js';
import { Permissions } from '../enums/user.js';
import db from '../config/db.js';
import { InvalidOverallCategory, 
        SimilarTypeWasAlreadyAddedError,
        PermissionsError } from '../errors/types.js';
import User from '../models/User.js';

class Type {

    /**
     * @param {OverallCategory} overallCategory 
     */
    static isValidOverallCategory(overallCategory) { 
        return overallCategory >= 1 && overallCategory <= Object.keys(overallCategory).length
    }

    /**
     * @param {string} name 
     * @param {string} descripton 
     * @param {OverallCategory} overallCategory
     * @param {string} unit
     */
    constructor(name, unit, descripton, overallCategory) {
        this.name = name;
        this.unit = unit;
        this.descripton = descripton;
        this.status = TypeStatus.DIRTY;
        //! check overall category
        if (!Type.isValidOverallCategory(this.overallCategory)) {
            throw new InvalidOverallCategory();

        }
        this.overallCategory = overallCategory;
    }

    static async isThereSimilarTypes(name, unit) {
        let sql = /*sql*/`select * from types where name LIKE ? and unit LIKE ?`;
        const [result, _] = await db.execute(sql, [`%${name}%`, `%${unit}%`]);
        return result.length > 0;
    }

    async addType() {
        if (await Type.isThereSimilarTypes(this.name)) { 
            throw new SimilarTypeWasAlreadyAddedError();

        }

        let sql = /*sql*/`insert into types(name, unit, description, status, overall_category) values (?, ?, ?, ?, ?)`;
        return await db.execute(sql, [
            this.name,
            this.unit,
            this.descripton,
            this.status,
            this.overallCategory
        ]);
    }

    static async getAllTypes() {
        let sql = /*sql*/`select * from types`;
        return await db.execute(sql);
    }

    static async getTypeById(id) {
        let sql = /*sql*/`select * from types where id = ?`;
        return await db.execute(sql, [id]);
    }

    static async deleteType(id) {
        let sql = /*sql*/`delete from types where id =?`;
        return await db.execute(sql, [id]);
    }

    /**
     * @param {string} id 
     * @param {JSON} info 
     */
    static async updateType(id, info) {
        const { name, unit, description, status, overall_category } = info;

        let updateClauses = [];

        if (name !== undefined) {
            if (await Type.isThereSimilarTypes(name)) { 
                throw new SimilarTypeWasAlreadyAddedError();
    
            }
            updateClauses.push({ field: 'name', value: name });
        }

        if (unit !== undefined) { 
            updateClauses.push({ field: 'unit', value: unit });
        } 

        if (description !== undefined) {
            updateClauses.push({ field: 'description', value: description });
        }

        if (status !== undefined) {
            updateClauses.push({ field: 'status', value: status });
        }

        if (overall_category !== undefined) {
            if (!Type.isValidOverallCategory(overall_category)) {
                throw new InvalidOverallCategory();
    
            }
            updateClauses.push({ field: 'overall_category', value: overall_category });
        }

        if (updateClauses.length === 0) {
            //! No updates to perform
            return;
        }

        const setStatements = updateClauses.map(({ field }) => `${field} = ?`).join(', ');
        const values = updateClauses.map(({ value }) => value);

        const sql = `UPDATE types SET ${setStatements} WHERE id = ?`;
        return await db.execute(sql, [...values, id]);
    }

    /**
     * @param {JSON} fields 
     */
    static async search(fields) {
        let query = /*sql*/`SELECT * FROM types WHERE 1`;

        const { name, unit, description, status, overall_category } = fields;

        if (name !== undefined) {
            query += /*sql*/` AND name = ?`;
        }

        if (unit !== undefined) { 
            query += /*sql*/` AND unit = ?`;
        }

        if (description !== undefined) {
            query += /*sql*/` AND description = ?`;
        }

        if (status !== undefined) {
            query += /*sql*/` AND status = ?`;
        }

        if (overall_category !== undefined) {
            query += /*sql*/` AND overall_category = ?`;
        }

        return await db.execute(query, Object.values(fields).filter(value => value !== undefined));
    }

    static async getAllDirtyTypes() {
        let sql = /*sql*/`SELECT * FROM types WHERE status = ?`;
        return await db.execute(sql, [TypeStatus.DIRTY]);
    }

    static async getAllAcceptedTypes() {
        let sql = /*sql*/`SELECT * FROM types WHERE status =?`;
        return await db.execute(sql, [TypeStatus.ACCEPTED]);
    }

    /**
     * @param {number} id 
     */
    static async accpetType(id, username) {
        const [user, _] = await User.getUserByUsername(username);
        if (user[0].permission != Permissions.ADMIN) {
            throw new PermissionsError();

        }
        let sql = /*sql*/`UPDATE types SET status = ? WHERE id = ?`;
        return await db.execute(sql, [TypeStatus.ACCEPTED, id]);
    }

    /**
     * @param {number} id 
     */
    static async rejectType(id, username) { 
        const [user, _] = await User.getUserByUsername(username);
        if (user[0].permission != Permissions.ADMIN) {
            throw new PermissionsError();

        }
        let sql = /*sql*/`UPDATE types SET status = ? WHERE id = ?`;
        return await db.execute(sql, [TypeStatus.REJECTED, id]);
    }

}

export default Type;