import { Request, Response } from 'express';
import { CommentService } from '../services/CommentService';
import { AuthRequest } from '../middlewares/authMiddleware';

const commentService = new CommentService();

export class CommentController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user_id = req.user!.id;
      const post_id = Number(req.params.post_id);
      const { content } = req.body;
      const comment = await commentService.addComment(user_id, post_id, content);
      res.status(201).json({ message: '✅ Comentário adicionado!', comment });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getByPost(req: Request, res: Response): Promise<void> {
    try {
      const post_id = Number(req.params.post_id);
      const comments = await commentService.getComments(post_id);
      res.status(200).json(comments);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const user_id = req.user!.id;
      await commentService.deleteComment(id, user_id);
      res.status(200).json({ message: '✅ Comentário deletado!' });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}