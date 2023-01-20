/// feed query
// store show update delete
// insert select update delete
const { pool } = require('../../data');

exports.index = async (ctx, next) => {
    const query = `SELECT created_at FROM feed WHERE id=?`
    return await pool(query, [id]);
}

exports.store =  async (ctx, next) => {
    const query = `INSERT INTO feed (user_id, file_id, content) VALUES (?, ?, ?)`;
    return await pool(query, [user_id, file_id, content]);
}

exports.show =  async (ctx, next) => {
    const query = `SELECT * FROM feed WHERE id = ?`
    return await pool(query, [id]);
}

exports.update =  async (ctx, next) => {
    const query = `
        UPDATE user 
        SET file_id = ?,
            content = ?,
        WHERE id = ?
        `;
    return await pool(query, [file_id, content, id]);
}

exports.qdelete =  async (ctx, next) => {
    const query = `DELETE feed WHERE id = ?`
    return await pool(query, [id]);
}
