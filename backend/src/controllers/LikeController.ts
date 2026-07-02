import { Response } from 'express';
import { LikeService } from '../services/LikeService';
import { AuthRequest } from '../middlewares/authMiddleware';

const likeService = new LikeService();

export class LikeController {
  async toggle(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user_id = req.user!.id;
      const post_id = Number(req.params.post_id);
      const result = await likeService.toggleLike(user_id, post_id);
      res.status(200).json({
        message: result.liked ? '✅ Post curtido!' : '✅ Curtida removida!',
        liked: result.liked
      });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}