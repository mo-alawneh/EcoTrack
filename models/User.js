import CurrentDateGenerator from '../helpers/CurrentDateGenerator.js';
import { createHash } from 'crypto';
import db from '../config/db.js';
import { Permissions, Category } from '../enums/user.js';
import { InvalidPermissionError,
        InvalidCategoryError,
        AdminCannotBeRemovedError,
        WeakPasswordError } from '../errors/user.js';
import PasswordChecker from '../helpers/PasswordChecker.js';
import CodeGenerator from '../helpers/CodeGenerator.js';
import { TopUsers } from '../enums/score.js';

class User {

    /**
     * @param {Permissions} permission  
     */
    static isValidPermission(permission) {
        return permission >= 1 && permission <= Object.keys(Permissions).length;
    }

    /**
     * @param {Category} category 
     */
    static isValidCategory(category) {
        return category >= 1 && category <= Object.keys(Category).length;
    }

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
        if (!User.isValidPermission(this.permission)) {
            throw new InvalidPermissionError();

        }

        this.category = category;
        if (!User.isValidCategory(this.category)) {
            throw new InvalidCategoryError();

        }
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
            createHash('sha256').update(this.password).digest('hex'),
            this.birthDate,
            this.joinedAt,
            this.permission,
            this.category,
            this.country,
            this.city,
            this.score,
            this.email
        ]);
    }

    static async getAllUsers() {
        let sql = /*sql*/`select username, first_name, middle_name, last_name, email, country, city, permission, category, birth_date, joined_at, score from users`;
        return await db.execute(sql);
    }

    /**
     * @param {string} username 
     */
    static async getUserPassword(username) {
        let sql = /*sql*/`select password from users where username = ?`;
        return await db.execute(sql, [username]);
    }

    /**
     * @param {string} username 
     */
    static async getUserByUsername(username) {
        let sql = /*sql*/`select username, first_name, middle_name, last_name, email, country, city, permission, category, birth_date, joined_at, score from users where username = ?`;
        return await db.execute(sql, [username]);
    }

    /**
     * @param {string} username 
     */
    static async deleteUser(username) {
        //! if id refers to an admin
        const [result, _] = await this.getUserByUsername(username);
        if (result[0].permission == Permissions.ADMIN) 
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
    
        let updateClauses = [];
    
        if (name) {
            const { firstName, middleName, lastName } = name;
            if (firstName) {
                updateClauses.push({ field: 'first_name', value: firstName });
            }
    
            if (middleName) {
                updateClauses.push({ field: 'middle_name', value: middleName });
            }
    
            if (lastName) {
                updateClauses.push({ field: 'last_name', value: lastName });
            }
        }
    
        if (email) {
            updateClauses.push({ field: 'email', value: email });
        }
    
        if (password) {
            if (!PasswordChecker.isStrongPassword(password))
                throw new WeakPasswordError();
    
            updateClauses.push({ field: 'password', value: createHash('sha256').update(password).digest('hex') });
        }
    
        if (birthDate) {
            updateClauses.push({ field: 'birth_date', value: birthDate });
        }
    
        if (category) {
            if (!User.isValidCategory(category)) {
                throw new InvalidCategoryError();
                
            }
            updateClauses.push({ field: 'category', value: category });
        }
    
        if (location) {
            const { country, city } = location;
    
            if (country) {
                updateClauses.push({ field: 'country', value: country });
            }
    
            if (city) {
                updateClauses.push({ field: 'city', value: city });
            }
        }
    
        if (updateClauses.length === 0) {
            //! No updates to perform
            return;
        }
    
        const setStatements = updateClauses.map(({ field }) => `${field} = ?`).join(', ');
        const values = updateClauses.map(({ value }) => value);
    
        const sql = `UPDATE users SET ${setStatements} WHERE username = ?`;
        return await db.execute(sql, [...values, username]);
    }

    /**
     * @param {JSON} fields
     */
    static async search(fields) {
        let query = /*sql*/`SELECT username, first_name, middle_name, last_name, email, country, city, permission, category, birth_date, joined_at, score FROM users WHERE 1`;
    
        const { name, username, email, permission, category, location } = fields;
        const values = [];
    
        if (name) {
            const { firstName, middleName, lastName } = name || {};
            if (firstName) {
                query += /*sql*/` AND first_name = ?`;
                values.push(firstName);
            }
            if (middleName) {
                query += /*sql*/` AND middle_name = ?`;
                values.push(middleName);
            }
            if (lastName) {
                query += /*sql*/` AND last_name = ?`;
                values.push(lastName);
            }
        }
    
        if (username) {
            query += /*sql*/` AND username = ?`;
            values.push(username);
        }
    
        if (email) {
            query += /*sql*/` AND email = ?`;
            values.push(email);
        }
    
        if (permission) {
            query += /*sql*/` AND permission = ?`;
            values.push(permission);
        }
    
        if (category) {
            query += /*sql*/` AND category = ?`;
            values.push(category);
        }
    
        if (location) {
            const { country, city } = location;
            if (country) {
                query += /*sql*/` AND country = ?`;
                values.push(country);
            }
            if (city) {
                query += /*sql*/` AND city = ?`;
                values.push(city);
            }
        }
    
        return await db.execute(query, values);
    }

    /**
     * @param {string} email 
     */
    static async handleForgetPassword(username) {
        //! 1- generate a new password
        const newPassword = CodeGenerator.generatePassword();
        
        //! 2- get user email
        let sqlToGetEmail = /*sql*/`select email from users where username = ?`;
        const [user, _] = await db.execute(sqlToGetEmail, [username]);
        const email = user[0].email;

        //! 3- update the password in the database
        let sql = /*sql*/`update users set password = ? where username = ?`;
        await db.execute(sql, [createHash('sha256').update(newPassword).digest('hex'), username]);

        return { email, newPassword }; 
    }

    /**
     * @param {number} points 
     */
    static async increaseScore(username, points) {
        let sql = /*sql*/`update users set score = score + ? where username = ?`;
        return await db.execute(sql, [points, username]);
    }

    static async getTopScoreUsers() {
        let sql = /*sql*/`
        SELECT username, score
        FROM users
        ORDER BY score DESC
        LIMIT ?`;

        return await db.execute(sql, [TopUsers.TOP_USERS_NUM]);
    }
}

export default User;