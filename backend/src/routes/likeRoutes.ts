import { Router } from 'express';
import { LikeController } from '../controllers/LikeController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const likeController = new LikeController();

router.post('/:post_id', authMiddleware, (req, res) => likeController.toggle(req as any, res));

export default router;