import ReactPlayer from "react-player";
import { VideoType } from "./VideoType";
import "./VideoPlayer.css";
import apiClient from "../../services/api-client";
import { useMemo } from "react";
import { useAuthenticated } from "../VerifyAuth";
import starFavorited from "../../assets/icons/elements/star-filled.svg";
import starNotFavorited from "../../assets/icons/elements/star-outline.svg";

export const VideoPlayer = ({
  video,
  favoriteVideos,
  getFavoriteVideos,
}: VideoType) => {
  const { dataPublicacao, descricao, nome, thumbUrl, url, id } = video;
  const dataFormatada = new Date(dataPublicacao).toLocaleDateString("pt-br");

  const { isAuthenticated } = useAuthenticated();

  const favoriteVideosId = useMemo<string[]>(() => {
    const favoriteVideosIdArr: null | string[] = [];

    if (favoriteVideos.length > 0) {
      favoriteVideos.map((f) => {
        favoriteVideosIdArr.push(f.id);
      });
    }
    return favoriteVideosIdArr;
  }, [favoriteVideos]);

  const handleAddNewFavorite = async (videoId: string) => {
    const url = `/videos/${videoId}/favoritos`;

    try {
      await apiClient.post(url);
      getFavoriteVideos();
    } catch (error) {
      console.log("Error to favorite a new video");
    }
  };

  const handleRemoveAFavorite = async (videoId: string) => {
    const url = `/videos/${videoId}/favoritos`;

    try {
      await apiClient.delete(url);
      getFavoriteVideos();
    } catch (error) {
      console.log("Error to favorite a new video");
    }
  };

  const checkIThatVideoIsAfavoriteVideo = (id: string) => {
    const videoId = favoriteVideosId.filter((fv) => {
      return fv === id;
    });

    if (videoId.length > 0) return true;
    else return false;
  };

  const handleFavorite = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    if (checkIThatVideoIsAfavoriteVideo(id)) {
      handleRemoveAFavorite(id);
    } else {
      handleAddNewFavorite(id);
    }
  };

  return (
    <>
      <div className="containerVideoDados">
        <div className="titulo">
          <h1>
            {nome}{" "}
            {isAuthenticated && (
              <button
                className="favoritee"
                onClick={(e) => handleFavorite(e, id)}
              >
                {checkIThatVideoIsAfavoriteVideo(id) ? (
                  <img src={starFavorited} alt="" />
                ) : (
                  <img src={starNotFavorited} alt="" />
                )}
              </button>
            )}
          </h1>
          <div className="createdAt">
            {dataFormatada} | {descricao}
          </div>
        </div>
        <div className="v">
          {video.thumbUrl && (
            <ReactPlayer
              muted={true}
              width={"100%"}
              height={"100%"}
              playing={true}
              controls={true}
              url={url}
              light={thumbUrl}
            />
          )}
        </div>
      </div>
    </>
  );
};
