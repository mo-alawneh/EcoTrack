import { v4 as uuidv4 } from 'uuid';
import CurrentDateGenerator from '../helpers/CurrentDateGenerator.js';
import db from '../config/db.js';
import { TypeStatus } from '../enums/type.js';
import { Source } from '../enums/env-data.js';
import { AddedToDirtyTypeError } from '../errors/types.js';
import { InvalidSourceError } from '../errors/env-data.js';
import User from './User.js';
import { ScorePoints } from '../enums/score.js';

class EnvData {

    /**
     * @param {Source} source 
     */
    static isValidSource(source) { 
        return source >= 1 && source <= Object.keys(Source).length
    }

    /**
     * @param {string} username 
     * @param {JSON} data 
     * @param {Date} collectedDateTime 
     * @param {JSON} location 
     */
    constructor(username, data, collectedDateTime, location) {
        this.id = uuidv4();
        this.username = username;

        const { type, value, source, description } = data;
        if (!EnvData.isValidSource(source)) {
            throw new InvalidSourceError();

        }
        this.type = type;
        this.value = value;
        this.source = source;
        this.description = description;

        this.collectedDateTime = collectedDateTime;
        this.addedDate = CurrentDateGenerator.getCurrentDate();

        const { country, city, town } = location;
        this.country = country;
        this.city = city;
        this.town = town;
    }

    /**
     * @param {string} type 
     */
    static async isDirtyType(type) {
        let sql = /*sql*/ `select status from types where id = ?`;
        const [result, _] = await db.execute(sql, [type]);
        console.log(result[0].status);
        return result[0].status == TypeStatus.DIRTY;
    }

    async addEnvData() {
        if (await EnvData.isDirtyType(this.type)) {
            throw new AddedToDirtyTypeError();

        }
        User.increaseScore(this.username, ScorePoints.ADDING_ENV_DATA);
        let sql = /*sql*/`insert into env_data values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        return await db.execute(sql, [
            this.id,
            this.username,
            this.type,
            this.value,
            this.source,
            this.description,
            this.collectedDateTime,
            this.addedDate,
            this.country,
            this.city,
            this.town
        ]);
    }

    static async getAllEnvData() {
        let sql = /*sql*/`select * from env_data`;
        return await db.execute(sql);
    }

    /**
     * @param {string} username 
     */
    static async getUserEnvData(username) {
        let sql = /*sql*/`select * from env_data where username = ?`;
        return await db.execute(sql, [username]);
    }

    /**
     * @param {string} id 
     *
     */
    static async getEnvDataById(id) {
        let sql = /*sql*/`select * from env_data where id = ?`;
        return await db.execute(sql, [id]);
    }

    /**
     * @param {string} id 
     */
    static async deleteEnvData(id) {
        let sql = /*sql*/`delete from env_data where id = ?`;
        return await db.execute(sql, [id]);
    }

    /**
     * @param {string} id 
     * @param {JSON} info 
     */
    static async updateEnvData(id, info) {
        const { data, dates, location } = info;

        let updateClauses = [];

        if (data) {
            const { type, value, source, description } = data;

            if (type) {
                if (await EnvData.isDirtyType(type)) {
                    throw new AddedToDirtyTypeError();
        
                }
                updateClauses.push({ field: 'type', value: type });
            }

            if (value) {
                updateClauses.push({ field: 'value', value: value });
            }

            if (source) {
                if (!EnvData.isValidSource(source)) {
                    throw new InvalidSourceError();
        
                }
                updateClauses.push({ field: 'source', value: source });
            }

            if (description) {
                updateClauses.push({ field: 'description', value: description });
            }
        }

        if (dates) {
            const { collectedDateTime } = dates;

            if (collectedDateTime) {
                updateClauses.push({ field: 'collected_date_time', value: collectedDateTime });
            }
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

        if (updateClauses.length === 0) {
            //! No updates to perform
            return;
        }

        const setStatements = updateClauses.map(({ field }) => `${field} = ?`).join(', ');
        const values = updateClauses.map(({ value }) => value);

        const sql = `UPDATE env_data SET ${setStatements} WHERE id = ?`;
        return await db.execute(sql, [...values, id]);
    }

    /**
     * @param {Object} fields - The search criteria.
     */
    static async search(fields) {
        let query = /*sql*/`SELECT * FROM env_data WHERE 1`;

        const { username, data, dates, location } = fields;
        const values = [];

        if (username) {
            query += /*sql*/` AND username = ?`;
            values.push(username);
        }

        if (data) {
            const { type, value, source, description } = data;

            if (type !== undefined) {
                query += /*sql*/` AND type = ?`;
                values.push(type);
            }

            if (value !== undefined) {
                query += /*sql*/` AND value = ?`;
                values.push(value);
            }

            if (source !== undefined) {
                query += /*sql*/` AND source = ?`;
                values.push(source);
            }

            if (description !== undefined) {
                query += /*sql*/` AND description = ?`;
                values.push(description);
            }
        }

        if (dates) {
            const { addedDate, collectedDateTime } = dates;

            if (addedDate !== undefined) {
                query += /*sql*/` AND added_date = ?`;
                values.push(addedDate);
            }

            if (collectedDateTime !== undefined) {
                query += /*sql*/` AND collected_date_time = ?`;
                values.push(collectedDateTime);
            }
        }

        if (location) {
            const { country, city, town } = location;

            if (country !== undefined) {
                query += /*sql*/` AND country = ?`;
                values.push(country);
            }

            if (city !== undefined) {
                query += /*sql*/` AND city = ?`;
                values.push(city);
            }

            if (town !== undefined) {
                query += /*sql*/` AND town = ?`;
                values.push(town);
            }
        }

        // Use appropriate table name in the query
        return await db.execute(query, values);
    }
}

export default EnvData;