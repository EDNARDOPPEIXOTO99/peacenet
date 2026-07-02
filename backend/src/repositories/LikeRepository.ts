import { pool } from '../config/database';

export class LikeRepository {
  async like(user_id: number, post_id: number): Promise<void> {
    await pool.query(
      'INSERT INTO likes (user_id, post_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [user_id, post_id]
    );
  }

  async unlike(user_id: number, post_id: number): Promise<void> {
    await pool.query(
      'DELETE FROM likes WHERE user_id = $1 AND post_id = $2',
      [user_id, post_id]
    );
  }

  async hasLiked(user_id: number, post_id: number): Promise<boolean> {
    const result = await pool.query(
      'SELECT id FROM likes WHERE user_id = $1 AND post_id = $2',
      [user_id, post_id]
    );
    return result.rowCount !== null && result.rowCount > 0;
  }
}