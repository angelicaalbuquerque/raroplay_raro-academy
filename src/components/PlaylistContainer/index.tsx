import "./PlaylistContainer.css";

type PlaylistContainerProps = {
  children: React.ReactNode;
};
export const PlaylistContainer = ({ children }: PlaylistContainerProps) => {
  return <div className="playlistContainer">{children}</div>;
};
