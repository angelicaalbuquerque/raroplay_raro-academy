export type VideoThumbnailProps = {
  id: string;
  nome?: string;
  url?: string;
  thumbUrl?: string;
  descricao?: string;
  dataPublicacao: string;
  createdAt: string;
  duracao?: string;
  topico?: string;
  tags?: string[];
};

export type VideoType = {
  video: VideoThumbnailProps;
  favoriteVideos: VideoThumbnailProps[], 
  getFavoriteVideos: () => Promise<void>
}