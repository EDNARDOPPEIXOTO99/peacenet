import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import { runMigrations } from './config/migrations';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import likeRoutes from './routes/likeRoutes';
import commentRoutes from './routes/commentRoutes';
import followRoutes from './routes/followRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: '🕊️ PeaceNet API - Paz Mundial!',
    status: 'online',
    version: '1.0.0'
  });
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/follows', followRoutes);

connectDB().then(async () => {
  await runMigrations();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📡 Rotas disponíveis:`);
    console.log(`   POST   http://localhost:${PORT}/api/users/register`);
    console.log(`   POST   http://localhost:${PORT}/api/users/login`);
    console.log(`   GET    http://localhost:${PORT}/api/users/profile/:id`);
    console.log(`   GET    http://localhost:${PORT}/api/posts/feed`);
    console.log(`   POST   http://localhost:${PORT}/api/posts`);
    console.log(`   DELETE http://localhost:${PORT}/api/posts/:id`);
    console.log(`   POST   http://localhost:${PORT}/api/likes/:post_id`);
    console.log(`   POST   http://localhost:${PORT}/api/comments/:post_id`);
    console.log(`   GET    http://localhost:${PORT}/api/comments/:post_id`);
    console.log(`   POST   http://localhost:${PORT}/api/follows/:user_id`);
    console.log(`   GET    http://localhost:${PORT}/api/follows/:user_id/followers`);
    console.log(`   GET    http://localhost:${PORT}/api/follows/:user_id/following`);
  });
});