import { pool } from '../config/database';

export class FollowRepository {
  async follow(follower_id: number, following_id: number): Promise<void> {
    await pool.query(
      'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [follower_id, following_id]
    );
  }

  async unfollow(follower_id: number, following_id: number): Promise<void> {
    await pool.query(
      'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2',
      [follower_id, following_id]
    );
  }

  async isFollowing(follower_id: number, following_id: number): Promise<boolean> {
    const result = await pool.query(
      'SELECT id FROM follows WHERE follower_id = $1 AND following_id = $2',
      [follower_id, following_id]
    );
    return result.rowCount !== null && result.rowCount > 0;
  }

  async getFollowers(user_id: number): Promise<any[]> {
    const result = await pool.query(`
      SELECT u.id, u.name, u.username, u.avatar_url, u.role, u.country
      FROM follows f
      JOIN users u ON f.follower_id = u.id
      WHERE f.following_id = $1
    `, [user_id]);
    return result.rows;
  }

  async getFollowing(user_id: number): Promise<any[]> {
    const result = await pool.query(`
      SELECT u.id, u.name, u.username, u.avatar_url, u.role, u.country
      FROM follows f
      JOIN users u ON f.following_id = u.id
      WHERE f.follower_id = $1
    `, [user_id]);
    return result.rows;
  }
}