import { Router } from 'express';
import { CommentController } from '../controllers/CommentController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const commentController = new CommentController();

router.post('/:post_id', authMiddleware, (req, res) => commentController.create(req as any, res));
router.get('/:post_id', (req, res) => commentController.getByPost(req, res));
router.delete('/:id', authMiddleware, (req, res) => commentController.delete(req as any, res));

export default router;