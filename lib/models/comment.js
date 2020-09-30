const pool = require('../utils/pool');

module.exports = class Comment {
  id;
  text;
  commenterId;
  postId;

  constructor(row) {
    this.id = row.id;
    this.text = row.text;
    this.commenterId = row.commenter_id;
    this.postId = row.post_id;
  }

  static async insert(comment) {
    const { rows } = await pool.query(
      'INSERT INTO comments (text, commenter_id, post_id) VALUES ($1, $2, $3) RETURNING *',
      [comment.text, comment.commenterId, comment.postId]
    );

    return new Comment(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM comments WHERE id=$1 RETURNING *',
      [id]
    );

    return new Comment(rows[0]);
  }
};