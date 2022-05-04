import "./PlaylistTitle.css";

type PropsTitle = {
  title: string;
};

export const PlaylistTitle = (props: PropsTitle) => {
  return <h2 className="playlistTitle">{props.title}</h2>;
};
