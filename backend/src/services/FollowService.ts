import { FollowRepository } from '../repositories/FollowRepository';

const followRepository = new FollowRepository();

export class FollowService {
  async toggleFollow(follower_id: number, following_id: number): Promise<{ following: boolean }> {
    if (follower_id === following_id) {
      throw new Error('Você não pode seguir a si mesmo!');
    }
    const isFollowing = await followRepository.isFollowing(follower_id, following_id);
    if (isFollowing) {
      await followRepository.unfollow(follower_id, following_id);
      return { following: false };
    } else {
      await followRepository.follow(follower_id, following_id);
      return { following: true };
    }
  }

  async getFollowers(user_id: number): Promise<any[]> {
    return await followRepository.getFollowers(user_id);
  }

  async getFollowing(user_id: number): Promise<any[]> {
    return await followRepository.getFollowing(user_id);
  }
}