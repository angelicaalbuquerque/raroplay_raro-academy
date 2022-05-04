import { useMemo } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../services/api-client";
import starFavorited from "../../assets/icons/elements/star-filled.svg";
import starNotFavorited from "../../assets/icons/elements/star-outline.svg";
import { useAuthenticated } from "../VerifyAuth";
import { VideoThumbnailProps } from "../Video/VideoThumbnailTypes";
import "./videosLaterais.css";

type FormTitleProps = {
  videoLateral: {
    id: string;
    dataPublicacao: string;
    thumbUrl: string;
    descricao: string;
  };
  favoriteVideos: VideoThumbnailProps[];
  getFavoriteVideos: () => Promise<void>;
};

export const VideosLaterais = ({
  videoLateral,
  favoriteVideos,
  getFavoriteVideos,
}: FormTitleProps) => {
  const { id, dataPublicacao, thumbUrl, descricao } = videoLateral;
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
      <div className="aside">
        <Link to={`/videos/${id}`}>
          <div className="videosLaterais">
            <img src={thumbUrl} alt="" />
            {isAuthenticated && (
              <button
                className="favorite"
                onClick={(e) => handleFavorite(e, id)}
              >
                {checkIThatVideoIsAfavoriteVideo(id) ? (
                  <img src={starFavorited} alt="" />
                ) : (
                  <img src={starNotFavorited} alt="" />
                )}
              </button>
            )}
          </div>
          <div className="textoContainer">
            <h3> {descricao} </h3>
            <p>{dataFormatada}</p>
          </div>
        </Link>
      </div>
    </>
  );
};
