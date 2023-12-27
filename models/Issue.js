import { Assessment } from '../enums/issue.js';
import { InvalidAssessmentError } from '../errors/issue.js';
import db from '../config/db.js';
import CurrentDateGenerator from '../helpers/CurrentDateGenerator.js';
import User from './User.js';
import { ScorePoints } from '../enums/score.js';

class Issue {
    /**
     * @param {Assessment} assessment 
     */
    static isValidAssessment(assessment) {
        return assessment >= 1 && assessment <= Object.keys(Assessment).length;
    }

    /**
     * @param {string} name 
     * @param {string} description 
     * @param {JSON} location 
     * @param {Assessment} assessment 
     * @param {string} username 
     * @param {Date} date 
     */
    constructor(name, description, location, assessment, username, date) { 
        this.name = name;
        this.description = description;
        this.location = location;
        if (!Issue.isValidAssessment(assessment)) {
            throw new InvalidAssessmentError();

        }
        this.assessment = assessment;
        this.username = username;
        this.date = date;
    }

    async addIssue() {
        User.increaseScore(this.username, ScorePoints.ADDING_ISSUE);
        const { country, city, town } = this.location;
        let sql = /*sql*/`insert into issues (name, description, country, city, town, assessment, username, date) values (?, ?, ?, ?, ?, ?, ?, ?)`;
        return await db.execute(sql, [this.name,
                                    this.description,
                                    country, city, town,
                                    this.assessment,
                                    this.username, 
                                    CurrentDateGenerator.getCurrentDate()]);
    }

    static async getAllIssues() {
        let sql = /*sql*/`select * from issues`;
        return await db.execute(sql);
    }

    static async getAllUserIssues() {
        let sql = /*sql*/`select * from issues where username = ?`;
        return await db.execute(sql, [this.username]);
    }

    /**
     * @param {number} id 
     */
    static async getIssueById(id) { 
        let sql = /*sql*/`select * from issues where id = ?`;
        return await db.execute(sql, [id]);
    }

    /**
     * @param {number} id 
     */
    static async deleteIssue(id) {
        let sql = /*sql*/`delete from issues where id = ?`;
        return await db.execute(sql, [id]);
    }

    /**
     * @param {number} issueId 
     * @param {JSON} info 
     */
    static async updateIssueInfo(issueId, info) {
        const { name, description, location, assessment, date } = info;

        let updateClauses = [];

        if (name) {
            updateClauses.push({ field: 'name', value: name });
        }

        if (description) {
            updateClauses.push({ field: 'description', value: description });
        }

        if (location) {
            const { country, city, town } = location;

            if (country) {
                updateClauses.push({ field: 'country', value: country });
            }

            if (city) {
                updateClauses.push({ field: 'city', value: city });
            }

            if (town) {
                updateClauses.push({ field: 'town', value: town });
            }
        }

        if (assessment) {
            if (!Issue.isValidAssessment(assessment)) {
                throw new InvalidAssessmentError();

            }
            updateClauses.push({ field: 'assessment', value: assessment });
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

        const sql = `UPDATE issues SET ${setStatements} WHERE id = ?`;
        return await db.execute(sql, [...values, issueId]);
    }

    /**
     * @param {JSON} fields
     */
    static async search(fields) {
        let query = /*sql*/`SELECT * FROM issues WHERE 1`;

        const { name, username, description, assessment, location, date } = fields;

        if (name) {
            query += /*sql*/` AND name LIKE ?`;
        }

        if (username) {
            query += /*sql*/` AND username = ?`;
        }

        if (description) {
            query += /*sql*/` AND description LIKE ?`;
        }

        if (assessment) {
            query += /*sql*/` AND assessment = ?`;
        }

        if (location && typeof location === 'object') {
            const { country, city, town } = location;
            if (country) {
                query += /*sql*/` AND country LIKE ?`;
            }
            if (city) {
                query += /*sql*/` AND city LIKE ?`;
            }
            if (town) {
                query += /*sql*/` AND town LIKE ?`;
            }
        }

        if (date) {
            query += /*sql*/` AND date = ?`;
        }

        return await db.execute(query);
    }

}

export default Issue;
