class PasswordChecker {
    /**
     * @param {string} str 
     */
    containsLowerCase(str) {
        return /[a-z]/.test(str);
    }

    /**
     * @param {string} str 
     */
    containsUpperCase(str) {
        return /[A-Z]/.test(str);
    }

    /**
     * @param {string} str 
     */
    containsNumber(str) {
        return /\d/.test(str);
    }

    /**
     * @param {string} str 
     */
    containsSpecialCharacter(str) {
        return /[^\w\d]/.test(str);
    }

    /**
     * @param {string} str 
     */
    isAcceptableLength(str) { 
        const MAX_PASSWORD_LENGTH = 10;
        return str.length >= MAX_PASSWORD_LENGTH;
    }

    /**
     * @param {string} str 
     */
    static isStrongPassword(str) {
        return this.containsLowerCase(str)
            && this.containsUpperCase(str)
            && this.containsNumber(str)
            && this.containsSpecialCharacter(str)
            && this.isAcceptableLength(str);
    }
}

export default PasswordChecker;