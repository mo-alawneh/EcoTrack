class CurrentDateGenerator {
    static getCurrentDate() {
        const date = new Date();
        const yyyy = date.getFullYear();
        const mm = date.getMonth() + 1;
        const dd = date.getDate();
        return `${yyyy}-${mm}-${dd}`;
    }
}

export default CurrentDateGenerator;