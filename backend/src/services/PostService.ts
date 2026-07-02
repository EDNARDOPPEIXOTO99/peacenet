import { PostRepository } from '../repositories/PostRepository';
import { Post } from '../entities/Post';

const postRepository = new PostRepository();

export class PostService {
  async createPost(data: {
    user_id: number;
    content: string;
    module: 'PAZ' | 'SOLIDARIEDADE' | 'RELACOES_HUMANAS';
    conflict_tag?: string;
  }): Promise<Post> {
    if (!data.content || data.content.trim() === '') {
      throw new Error('Conteúdo do post não pode ser vazio!');
    }
    if (!data.module) {
      throw new Error('Módulo é obrigatório: PAZ, SOLIDARIEDADE ou RELACOES_HUMANAS!');
    }
    return await postRepository.create(data);
  }

  async getFeed(): Promise<Post[]> {
    return await postRepository.findAll();
  }

  async getPostById(id: number): Promise<Post | null> {
    const post = await postRepository.findById(id);
    if (!post) throw new Error('Post não encontrado!');
    return post;
  }

  async getPostsByUser(user_id: number): Promise<Post[]> {
    return await postRepository.findByUserId(user_id);
  }

  async deletePost(id: number, user_id: number): Promise<void> {
    const deleted = await postRepository.delete(id, user_id);
    if (!deleted) throw new Error('Post não encontrado ou sem permissão!');
  }
}