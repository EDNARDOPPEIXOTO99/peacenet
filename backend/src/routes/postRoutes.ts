import { Router } from 'express';
import { PostController } from '../controllers/PostController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const postController = new PostController();

// Rotas públicas
router.get('/feed', (req, res) => postController.getFeed(req, res));
router.get('/:id', (req, res) => postController.getById(req, res));
router.get('/user/:user_id', (req, res) => postController.getByUser(req, res));

// Rotas protegidas
router.post('/', authMiddleware, (req, res) => postController.create(req as any, res));
router.delete('/:id', authMiddleware, (req, res) => postController.delete(req as any, res));

export default router;