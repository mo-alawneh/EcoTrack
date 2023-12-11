import CurrentDateGenerator from '../helpers/CurrentDateGenerator.js';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';
import db from '../config/db.js';
import { Permissions } from '../enums/enums.js';
import { AdminCannotBeRemovedError } from '../errors/errors.js';

class User {
    /**
     * @param {JSON} name 
     * @param {string} email 
     * @param {string} password 
     * @param {string} birthDate 
     * @param {number} permission 
     * @param {number} category 
     */
    constructor(name, email, password, birthDate, permission, category) {
        const { firstName, middleName, lastName } = name; //! destructing the name
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.id = uuidv4();
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
        this.joinedAt = CurrentDateGenerator.getCurrentDate();
        this.permission = permission;
        this.category = category;
        this.score = 0;
    }

    async registerUser() {
        let sql = /*sql*/`insert into users values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        return await db.execute(sql, [
            this.firstName,
            this.middleName,
            this.lastName, 
            this.id,
            this.email,
            createHash('sha256').update(this.password).digest('hex'),
            this.birthDate,
            this.joinedAt,
            this.permission,
            this.category,
            this.score
        ]);
    }

    static async getAllUsers() {
        let sql = /*sql*/`select * from users`;
        return await db.execute(sql);
    }

    /**
     * @param {string} id 
     */
    static async getUserById(id) {
        let sql = /*sql*/`select * from users where id = ?`;
        return await db.execute(sql, [id]);
    }

    /**
     * @param {string} id 
     */
    static async deleteUser(id) {
        //! if id refers to an admin
        const [result, _] = await this.getUserById(id);
        if (result[0].category == Permissions.ADMIN) 
            throw new AdminCannotBeRemovedError();

        let sql = /*sql*/`delete from users where id = ?`;
        return await db.execute(sql, [id]);
    }

    /**
     * @param {string} id 
     * @param {JSON} info
     */
    static async updateUserInfo(id, info) {
        const { name, email, birthDate, category } = info;

        if (name) {
            const { firstName, middleName, lastName } = name;
            if (firstName) {
                let sql = /*sql*/`update users set first_name = ? where id = ?`;
                return await db.execute(sql, [firstName, id]);
            }

            if (middleName) { 
                let sql = /*sql*/`update users set middle_name = ? where id = ?`;
                return await db.execute(sql, [middleName, id]);
            }

            if (lastName) { 
                let sql = /*sql*/`update users set last_name = ? where id = ?`;
                return await db.execute(sql, [lastName, id]);
            }
        }

        if (email) {
            let sql = /*sql*/`update users set email = ? where id = ?`;
            return await db.execute(sql, [email, id]);
        }

        if (birthDate) { 
            let sql = /*sql*/`update users set birth_date = ? where id = ?`;
            return await db.execute(sql, [birthDate, id]);
        }

        if (category) { 
            let sql = /*sql*/`update users set category = ? where id = ?`;
            return await db.execute(sql, [category, id]);
        }
    }
}

export default User;