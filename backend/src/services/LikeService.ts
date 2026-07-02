import { LikeRepository } from '../repositories/LikeRepository';

const likeRepository = new LikeRepository();

export class LikeService {
  async toggleLike(user_id: number, post_id: number): Promise<{ liked: boolean }> {
    const hasLiked = await likeRepository.hasLiked(user_id, post_id);
    if (hasLiked) {
      await likeRepository.unlike(user_id, post_id);
      return { liked: false };
    } else {
      await likeRepository.like(user_id, post_id);
      return { liked: true };
    }
  }
}