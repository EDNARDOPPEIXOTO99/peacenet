import { Request, Response } from 'express';
import { FollowService } from '../services/FollowService';
import { AuthRequest } from '../middlewares/authMiddleware';

const followService = new FollowService();

export class FollowController {
  async toggle(req: AuthRequest, res: Response): Promise<void> {
    try {
      const follower_id = req.user!.id;
      const following_id = Number(req.params.user_id);
      const result = await followService.toggleFollow(follower_id, following_id);
      res.status(200).json({
        message: result.following ? '✅ Seguindo!' : '✅ Deixou de seguir!',
        following: result.following
      });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getFollowers(req: Request, res: Response): Promise<void> {
    try {
      const user_id = Number(req.params.user_id);
      const followers = await followService.getFollowers(user_id);
      res.status(200).json(followers);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getFollowing(req: Request, res: Response): Promise<void> {
    try {
      const user_id = Number(req.params.user_id);
      const following = await followService.getFollowing(user_id);
      res.status(200).json(following);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}