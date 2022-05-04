import { VideoThumbnailProps } from "../Video/VideoThumbnailTypes";

export type PlaylistProps = {
  favoriteVideos: VideoThumbnailProps[];
  videos: VideoThumbnailProps[];
  getFavoriteVideos: () => Promise<void>
};