import db from '../config/db.js';
import CurrentDateGenerator from '../helpers/CurrentDateGenerator.js';
import User from './User.js';
import { ScorePoints } from '../enums/score.js';
import { RecentlyAdded } from '../enums/recently-added.js';

class Resource {

    /**
     * @param {string} username 
     * @param {string} title 
     * @param {string} description 
     * @param {string} link 
     */
    constructor(username, title, description, link) {
        this.username = username;
        this.title = title;
        this.description = description;
        this.link = link;
        this.date = CurrentDateGenerator.getCurrentDate();
    }

    async addResource() {
        User.increaseScore(this.username, ScorePoints.ADDING_RESOURCE);
        let sql = /*sql*/ `INSERT INTO resources (username, title, description, link, date) VALUES (?, ?, ?, ?, ?)`;
        return await db.execute(sql, [this.username, this.title, this.description, this.link,
        CurrentDateGenerator.getCurrentDate()]);
    }

    static async getAllResources() {
        let sql = /*sql*/ `SELECT * FROM resources`;
        return await db.execute(sql);
    }

    /**
     * @param {username} username 
     */
    static async getAllUserResources(username) {
        let sql = /*sql*/ `SELECT * FROM resources WHERE username = ?`;
        return await db.execute(sql, [username]);
    }

    /**
     * @param {number} id 
     * @returns 
     */
    static async getResourceById(id) {
        let sql = /*sql*/ `SELECT * FROM resources WHERE id = ?`;
        return await db.execute(sql, [id]);
    }

    /**
     * @param {number} id 
     */
    static async deleteResource(id) { 
        let sql = /*sql*/ `DELETE FROM resources WHERE id = ?`;
        return await db.execute(sql, [id]);
    }

    /**
     * @param {number} id 
     * @param {JSON} info 
     */
    static async updateResource(id, info) {
        const { username, title, description, link, date } = info;

        let updateClauses = [];

        if (username) {
            updateClauses.push({ field: 'username', value: username });
        }

        if (title) {
            updateClauses.push({ field: 'title', value: title });
        }

        if (description) {
            updateClauses.push({ field: 'description', value: description });
        }

        if (link) {
            updateClauses.push({ field: 'link', value: link });
        }

        if (date) {
            updateClauses.push({ field: 'date', value: date });
        }

        if (updateClauses.length === 0) {
            //! No updates to perform
            return;
        }

        const setStatements = updateClauses.map(({ field }) => `${field} = ?`).join(', ');
        const values = updateClauses.map(({ value }) => value);

        const sql = `UPDATE resources SET ${setStatements} WHERE id = ?`;
        return await db.execute(sql, [...values, id]);
    }

    /**
     * @param {Object} fields - The search criteria.
    */
    static async search(fields) {
        let query = /*sql*/`SELECT * FROM resources WHERE 1`;
        const values = [];

        const { username, title, description, link, date } = fields;

        if (username) {
            query += /*sql*/` AND username LIKE ?`;
            values.push(`%${username}%`);
        }

        if (title) {
            query += /*sql*/` AND title LIKE ?`;
            values.push(`%${title}%`);
        }

        if (description) {
            query += /*sql*/` AND description LIKE ?`;
            values.push(`%${description}%`);
        }

        if (link) {
            query += /*sql*/` AND link LIKE ?`;
            values.push(`%${link}%`);
        }

        if (date) {
            query += /*sql*/` AND date = ?`;
            values.push(date);
        }

        return await db.execute(query, values);
    }


    static async getRecentResources() {
        let sql = /*sql*/`
            SELECT * FROM resources
            ORDER BY date DESC
            LIMIT 3`;
        return await db.execute(sql, [RecentlyAdded.RESOURCES]);
    }
}

export default Resource;