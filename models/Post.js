const db = require('../config/db');

class Post {
    constructor(title, body) {
        this.title = title;
        this.body = body;
    }

    save() {
        let date = new Date();
        let yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        let createdAtDate = `${yyyy}-${mm}-${dd}`;

        let sql = `
            INSERT INTO posts(title, body, created_at) 
            VALUES ('${this.title}', '${this.body}', '${createdAtDate}')
        `;

        return db.execute(sql);
    }

    static findAll() {
        let sql = "SELECT * FROM posts;";

        return db.execute(sql);
    }

    static findById(id) {
        let sql = `SELECT * FROM posts WHERE id = ${id};`;

        return db.execute(sql);
    }

    static delete(id) {
        let sql = `DELETE FROM posts WHERE id = ${id};`;

        return db.execute(sql);
    }

    static search(title) {
        let sql = `SELECT * FROM posts WHERE title = ${title};`;

        return db.execute(sql);
    }
}

module.exports = Post;