import { CommentRepository, Comment } from '../repositories/CommentRepository';

const commentRepository = new CommentRepository();

export class CommentService {
  async addComment(user_id: number, post_id: number, content: string): Promise<Comment> {
    if (!content || content.trim() === '') {
      throw new Error('Comentário não pode ser vazio!');
    }
    return await commentRepository.create(user_id, post_id, content);
  }

  async getComments(post_id: number): Promise<Comment[]> {
    return await commentRepository.findByPostId(post_id);
  }

  async deleteComment(id: number, user_id: number): Promise<void> {
    const deleted = await commentRepository.delete(id, user_id);
    if (!deleted) throw new Error('Comentário não encontrado ou sem permissão!');
  }
}