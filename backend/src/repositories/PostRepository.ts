import { pool } from '../config/database';
import { Post } from '../entities/Post';

export class PostRepository {
  async create(post: Post): Promise<Post> {
    const { user_id, content, module, conflict_tag } = post;
    const result = await pool.query(
      `INSERT INTO posts (user_id, content, module, conflict_tag)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user_id, content, module, conflict_tag || null]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Post[]> {
    const result = await pool.query(`
      SELECT 
        p.*,
        u.name as author_name,
        u.username as author_username,
        u.avatar_url as author_avatar,
        u.role as author_role,
        COUNT(DISTINCT l.id) as likes_count,
        COUNT(DISTINCT c.id) as comments_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN likes l ON l.post_id = p.id
      LEFT JOIN comments c ON c.post_id = p.id
      GROUP BY p.id, u.name, u.username, u.avatar_url, u.role
      ORDER BY p.created_at DESC
    `);
    return result.rows;
  }

  async findById(id: number): Promise<Post | null> {
    const result = await pool.query(`
      SELECT 
        p.*,
        u.name as author_name,
        u.username as author_username,
        u.avatar_url as author_avatar,
        u.role as author_role,
        COUNT(DISTINCT l.id) as likes_count,
        COUNT(DISTINCT c.id) as comments_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN likes l ON l.post_id = p.id
      LEFT JOIN comments c ON c.post_id = p.id
      WHERE p.id = $1
      GROUP BY p.id, u.name, u.username, u.avatar_url, u.role
    `, [id]);
    return result.rows[0] || null;
  }

  async findByUserId(user_id: number): Promise<Post[]> {
    const result = await pool.query(`
      SELECT 
        p.*,
        u.name as author_name,
        u.username as author_username,
        u.avatar_url as author_avatar,
        u.role as author_role,
        COUNT(DISTINCT l.id) as likes_count,
        COUNT(DISTINCT c.id) as comments_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN likes l ON l.post_id = p.id
      LEFT JOIN comments c ON c.post_id = p.id
      WHERE p.user_id = $1
      GROUP BY p.id, u.name, u.username, u.avatar_url, u.role
      ORDER BY p.created_at DESC
    `, [user_id]);
    return result.rows;
  }

  async delete(id: number, user_id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, user_id]
    );
    return result.rowCount !== null && result.rowCount > 0;
  }
}