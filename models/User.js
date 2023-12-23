import CurrentDateGenerator from '../helpers/CurrentDateGenerator.js';
import { createHash } from 'crypto';
import db from '../config/db.js';
import { Permissions, Category } from '../enums/enums.js';
import { AdminCannotBeRemovedError, WeakPasswordError } from '../errors/errors.js';
import PasswordChecker from '../helpers/PasswordChecker.js';
import CodeGenerator from '../helpers/CodeGenerator.js';
import { sendEmail } from '../services/email-sender.js';

class User {
    /**
     * @param {JSON} name 
     * @param {string} username
     * @param {string} email 
     * @param {string} password 
     * @param {string} birthDate 
     * @param {number} permission 
     * @param {number} category 
     * @param {JSON} location
     */
    constructor(name, username, email, password, birthDate, permission, category, location) {
        const { firstName, middleName, lastName } = name; //! destructing the name
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        if (!PasswordChecker.isStrongPassword(password))
            throw new WeakPasswordError();
        this.password = password;
        this.birthDate = birthDate;
        this.joinedAt = CurrentDateGenerator.getCurrentDate();
        this.permission = permission;
        this.category = category;
        const { country, city } = location;
        this.country = country;
        this.city = city;
        this.score = 0;
    }

    async registerUser() {
        let sql = /*sql*/`insert into users values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        return await db.execute(sql, [
            this.firstName,
            this.middleName,
            this.lastName, 
            this.username,
            this.email,
            createHash('sha256').update(this.password).digest('hex'),
            this.birthDate,
            this.joinedAt,
            this.permission,
            this.category,
            this.country,
            this.city,
            this.score
        ]);
    }

    static async getAllUsers() {
        let sql = /*sql*/`select * from users`;
        return await db.execute(sql);
    }

    /**
     * @param {string} username 
     */
    static async getUserByUsername(username) {
        let sql = /*sql*/`select * from users where username = ?`;
        return await db.execute(sql, [username]);
    }

    /**
     * @param {string} username 
     */
    static async deleteUser(username) {
        //! if id refers to an admin
        const [result, _] = await this.getUserByUsername(username);
        if (result[0].category == Permissions.ADMIN) 
            throw new AdminCannotBeRemovedError();

        let sql = /*sql*/`delete from users where username = ?`;
        return await db.execute(sql, [username]);
    }

    /**
     * @param {string} username 
     * @param {JSON} info
     */
    static async updateUserInfo(username, info) {
        const { name, email, password, birthDate, category, location } = info;

        if (name) {
            const { firstName, middleName, lastName } = name;
            if (firstName) {
                let sql = /*sql*/`update users set first_name = ? where username = ?`;
                return await db.execute(sql, [firstName, username]);
            }

            if (middleName) { 
                let sql = /*sql*/`update users set middle_name = ? where username = ?`;
                return await db.execute(sql, [middleName, username]);
            }

            if (lastName) { 
                let sql = /*sql*/`update users set last_name = ? where username = ?`;
                return await db.execute(sql, [lastName, username]);
            }
        }

        if (email) {
            let sql = /*sql*/`update users set email = ? where username = ?`;
            return await db.execute(sql, [email, username]);
        }

        if (password) { 
            if (!PasswordChecker.isStrongPassword(password))
                throw new WeakPasswordError();

            let sql = /*sql*/`update users set password = ? where username = ?`;
            return await db.execute(sql, [password, username]);
        }

        if (birthDate) { 
            let sql = /*sql*/`update users set birth_date = ? where username = ?`;
            return await db.execute(sql, [birthDate, username]);
        }

        if (category) { 
            let sql = /*sql*/`update users set category = ? where username = ?`;
            return await db.execute(sql, [category, username]);
        }

        if (location) {
            const { country, city } = location;

            if (country) {
                let sql = /*sql*/`update users set country = ? where username = ?`;
                return await db.execute(sql, [country, username]);
            }

            if (city) { 
                let sql = /*sql*/`update users set city = ? where username = ?`;
                return await db.execute(sql, [city, username]);
            }
        }
    }

    /**
     * @param {JSON} name 
     * @param {string} email 
     * @param {Permissions} permission 
     * @param {Category} category 
     * @param {JSON} location 
     */
    static async search(name, username, email, permission, category, location) {
        let query = /*sql*/`SELECT * FROM your_table_name WHERE 1`;

        const { firstName, middleName, lastName } = name || {};
        if (firstName) {
            query += /*sql*/` AND first_name = ?`;
        }
        if (middleName) {
            query += /*sql*/` AND middle_name = ?`;
        }
        if (lastName) {
            query += /*sql*/` AND last_name = ?`;
        }

        if (username) {
            query += /*sql*/` AND username = ?`;
        }

        if (email) {
            query += /*sql*/` AND email = ?`;
        }

        if (permission) {
            query += /*sql*/` AND permission = ?`;
        }

        if (category) {
            query += /*sql*/` AND category = ?`;
        }

        const { country, city } = location || {};
        if (country) {
            query += /*sql*/` AND country = ?`;
        }
        if (city) {
            query += /*sql*/` AND city = ?`;
        }
    }

    /**
     * @param {string} email 
     */
    static async handleForgetPassword(email) {
        //! 1- generate a new password
        const newPassword = CodeGenerator.generatePassword();
        
        //! 2- send the new password via email
        const emailOptions = {
            to: email,
            subject: 'New Password',
            text: `You password has been updated to ${newPassword}`
        }
        sendEmail(emailOptions);

        //! 3- update the password in the database
        let sql = /*sql*/`update users set password = ? where email = ?`;
        return await db.execute(sql, [newPassword, email]);
    }

    /**
     * @param {string} email 
     */
    static async verifyEmail(email) {
         //! 1- generate a verification code
        const verificationCode = CodeGenerator.generateVerificationCode();
        
        //! 2- send the new password via email
        const emailOptions = {
            to: email,
            subject: 'Verification Code',
            text: `You verification code is ${verificationCode}`
        }
        sendEmail(emailOptions);

        //! return it
        return verificationCode;
    }
}

export default User;