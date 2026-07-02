import { Router } from 'express';
import { FollowController } from '../controllers/FollowController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const followController = new FollowController();

router.post('/:user_id', authMiddleware, (req, res) => followController.toggle(req as any, res));
router.get('/:user_id/followers', (req, res) => followController.getFollowers(req, res));
router.get('/:user_id/following', (req, res) => followController.getFollowing(req, res));

export default router;