const pool = require('../utils/pool');

module.exports = class Post {
  id;
  userId;
  photo;
  caption;
  tags;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.photo = row.photo;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async insert(post) {
    const { rows } = await pool.query(
      'INSERT INTO posts (user_id, photo, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *',
      [post.userId, post.photo, post.caption, post.tags]
    );

    return new Post(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM posts'
    );

    return rows.map(row => new Post(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM posts WHERE id=$1',
      [id]
    );

    if (!rows[0]) return null;
    else return new Post(rows[0]);
  }

  static async update(id, caption) {
    const { rows } = await pool.query(
      `UPDATE posts
       SET caption=$1
       WHERE id=$2
       RETURNING *
      `,
      [caption, id]
    );

    return new Post(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM posts WHERE id=$1 RETURNING *',
      [id]
    );

    return new Post(rows[0]);
  }
}