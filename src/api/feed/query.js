/// feed query
// store show update delete
// insert select update delete
const { pool } = require('../../data');

exports.qindex = async (ctx, next) => {
    const query = `SELECT created_at FROM feed WHERE id=?`
    return await pool(query, [id]);
}

exports.qstore =  async (ctx, next) => {
    const query = `INSERT INTO feed (user_id, file_id, content, updated_at) VALUES (?, ?, ?, ?)`;
    return await pool(query, [user_id, file_id, content, updated_at]);
}

exports.qshow =  async (ctx, next) => {
    const query = `SELECT * FROM feed WHERE id = ?`
    return await pool(query, [id]);
}

exports.qupdate =  async (ctx, next) => {
    const query = `
        UPDATE user 
        SET file_id = ?,
            content = ?,
            updated_at = ?,
        WHERE id = ?
        `;
    return await pool(query, [file_id, content, updated_at, id]);
}

exports.qdelete =  async (ctx, next) => {
    const query = `DELETE feed WHERE id = ?`
    return await pool(query, [id]);
}
