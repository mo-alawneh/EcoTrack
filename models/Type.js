import { OverallCategory, TypeStatus } from '../enums/type.js';
import db from '../config/db.js';
import { InvalidOverallCategory } from '../errors/types.js';

class Type {
    /**
     * @param {string} name 
     * @param {string} descripton 
     * @param {OverallCategory} overallCategory 
     */
    constructor(name, descripton, overallCategory) {
        this.name = name;
        this.descripton = descripton;
        this.status = TypeStatus.DIRTY;
        //! check overall category
        if (overallCategory < 1 
            || overallCategory > Object.keys(OverallCategory).length) {
            throw new InvalidOverallCategory();

        }
        this.overallCategory = overallCategory;
    }

    async addType() {
        let sql = /*sql*/`insert into types(name, description, status, overall_category) values (?, ?, ?, ?)`;
        return await db.execute(sql, [
            this.name,
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
        const { name, description, status, overall_category } = info;

        let updateClauses = [];

        if (name !== undefined) {
            updateClauses.push({ field: 'name', value: name });
        }

        if (description !== undefined) {
            updateClauses.push({ field: 'description', value: description });
        }

        if (status !== undefined) {
            updateClauses.push({ field: 'status', value: status });
        }

        if (overall_category !== undefined) {
            if (overall_category < 1 
                || overall_category > Object.keys(OverallCategory).length) {
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
    static async searchTypes(fields) {
        let query = /*sql*/`SELECT * FROM types WHERE 1`;

        const { name, description, status, overall_category } = fields;

        if (name !== undefined) {
            query += /*sql*/` AND name = ?`;
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

}

export default Type;