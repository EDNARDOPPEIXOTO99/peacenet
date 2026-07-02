import { pool } from '../config/database';

export interface Comment {
  id?: number;
  user_id: number;
  post_id: number;
  content: string;
  created_at?: Date;
  author_name?: string;
  author_username?: string;
}

export class CommentRepository {
  async create(user_id: number, post_id: number, content: string): Promise<Comment> {
    const result = await pool.query(
      `INSERT INTO comments (user_id, post_id, content)
       VALUES ($1, $2, $3) RETURNING *`,
      [user_id, post_id, content]
    );
    return result.rows[0];
  }

  async findByPostId(post_id: number): Promise<Comment[]> {
    const result = await pool.query(`
      SELECT c.*, u.name as author_name, u.username as author_username
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = $1
      ORDER BY c.created_at ASC
    `, [post_id]);
    return result.rows;
  }

  async delete(id: number, user_id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM comments WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, user_id]
    );
    return result.rowCount !== null && result.rowCount > 0;
  }
}