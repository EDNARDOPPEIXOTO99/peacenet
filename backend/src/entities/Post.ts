export interface Post {
  id?: number;
  user_id: number;
  content: string;
  module: 'PAZ' | 'SOLIDARIEDADE' | 'RELACOES_HUMANAS';
  conflict_tag?: string;
  likes_count?: number;
  comments_count?: number;
  created_at?: Date;
  // dados do autor
  author_name?: string;
  author_username?: string;
  author_avatar?: string;
  author_role?: string;
}