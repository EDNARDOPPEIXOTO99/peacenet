import { Request, Response } from 'express';
import { PostService } from '../services/PostService';
import { AuthRequest } from '../middlewares/authMiddleware';

const postService = new PostService();

export class PostController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user_id = req.user!.id;
      const { content, module, conflict_tag } = req.body;
      const post = await postService.createPost({ user_id, content, module, conflict_tag });
      res.status(201).json({ message: '✅ Post criado com sucesso!', post });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getFeed(req: Request, res: Response): Promise<void> {
    try {
      const posts = await postService.getFeed();
      res.status(200).json(posts);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const post = await postService.getPostById(id);
      res.status(200).json(post);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async getByUser(req: Request, res: Response): Promise<void> {
    try {
      const user_id = Number(req.params.user_id);
      const posts = await postService.getPostsByUser(user_id);
      res.status(200).json(posts);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const user_id = req.user!.id;
      await postService.deletePost(id, user_id);
      res.status(200).json({ message: '✅ Post deletado com sucesso!' });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}