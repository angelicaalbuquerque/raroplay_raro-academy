import apiClient from "../../services/api-client";
import { useMemo } from "react";
import { useAuthenticated } from "../../components/VerifyAuth";
import { PlaylistProps } from "./PlaylistTypes";
import { VideoFavorited } from "../VideoFavorited";
import { PlaylistTitle } from "../PlaylistTitle";
import { PlaylistContainer } from "../PlaylistContainer";
import { Video } from "../Video";
import { SimpleSlider } from "../SimpleSlider";

const Playlist: React.FC<PlaylistProps> = ({ videos, favoriteVideos, getFavoriteVideos }) => {
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
      getFavoriteVideos()
    } catch (error) {
      console.log("Error to favorite a new video");
    }
  };

  const handleRemoveAFavorite = async (videoId: string) => {
    const url = `/videos/${videoId}/favoritos`;
    
    try {
      await apiClient.delete(url);
      getFavoriteVideos()
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
    <div className="home">      
      {isAuthenticated && (
        <PlaylistContainer>
          <PlaylistTitle title="Favoritos" />                              
          {favoriteVideos.length === 0 ? "Você ainda não possui vídeos favoritos a serem exibidos aqui." +
    " Para começar a favoritar, clique no ícone de estrela.":
          <SimpleSlider>
              {favoriteVideos.map((video) => (              
                  <VideoFavorited
                    video={video}
                    key={video.id}
                    handleRemoveAFavorite={handleRemoveAFavorite}/>
                  )
                )            
              }
            </SimpleSlider> }
        </PlaylistContainer>
      )}

      <PlaylistContainer>
        <PlaylistTitle title="Aulão" />
        <SimpleSlider>
          {videos
            .filter((v) => v.topico === "aulão")
            .map((video) => (
              <Video
                video={video}
                key={video.id}
                handleFavorite={handleFavorite}
                checkIThatVideoIsAfavoriteVideo={
                  checkIThatVideoIsAfavoriteVideo
                }
              />
            ))}
        </SimpleSlider>
      </PlaylistContainer>

      {isAuthenticated && (
        <PlaylistContainer>
          <PlaylistTitle title="Semana 01" />
          <SimpleSlider>
            {videos
              .filter((v) => v.topico === "semana 01")
              .map((video) => (
                <Video
                  video={video}
                  key={video.id}
                  handleFavorite={handleFavorite}
                  checkIThatVideoIsAfavoriteVideo={
                    checkIThatVideoIsAfavoriteVideo
                  }
                />
              ))}
          </SimpleSlider>
        </PlaylistContainer>
      )}

      {isAuthenticated && (
        <PlaylistContainer>
          <PlaylistTitle title="Semana 02" />
          <SimpleSlider>
            {videos
              .filter((v) => v.topico === "semana 02")
              .map((video) => (
                <Video
                  video={video}
                  key={video.id}
                  handleFavorite={handleFavorite}
                  checkIThatVideoIsAfavoriteVideo={
                    checkIThatVideoIsAfavoriteVideo
                  }
                />
              ))}
          </SimpleSlider>
        </PlaylistContainer>
      )}

      {isAuthenticated && (
        <PlaylistContainer>
          <PlaylistTitle title="Semana 03" />
          <SimpleSlider>
            {videos
              .filter((v) => v.topico === "semana 03")
              .map((video) => (
                <Video
                  video={video}
                  key={video.id}
                  handleFavorite={handleFavorite}
                  checkIThatVideoIsAfavoriteVideo={
                    checkIThatVideoIsAfavoriteVideo
                  }
                />
              ))}
          </SimpleSlider>
        </PlaylistContainer>
      )}

      {isAuthenticated && (
        <PlaylistContainer>
          <PlaylistTitle title="Semana 04" />
          <SimpleSlider>
            {videos
              .filter((v) => v.topico === "semana 04")
              .map((video) => (
                <Video
                  video={video}
                  key={video.id}
                  handleFavorite={handleFavorite}
                  checkIThatVideoIsAfavoriteVideo={
                    checkIThatVideoIsAfavoriteVideo
                  }
                />
              ))}
          </SimpleSlider>
        </PlaylistContainer>
      )}

      {isAuthenticated && (
        <PlaylistContainer>
          <PlaylistTitle title="Semana 05" />
          <SimpleSlider>
            {videos
              .filter((v) => v.topico === "semana 05")
              .map((video) => (
                <Video
                  video={video}
                  key={video.id}
                  handleFavorite={handleFavorite}
                  checkIThatVideoIsAfavoriteVideo={
                    checkIThatVideoIsAfavoriteVideo
                  }
                />
              ))}
          </SimpleSlider>
        </PlaylistContainer>
      )}

      {isAuthenticated && (
        <PlaylistContainer>
          <PlaylistTitle title="Semana 06" />
          <SimpleSlider>
            {videos
              .filter((v) => v.topico === "semana 06")
              .map((video) => (
                <Video
                  video={video}
                  key={video.id}
                  handleFavorite={handleFavorite}
                  checkIThatVideoIsAfavoriteVideo={
                    checkIThatVideoIsAfavoriteVideo
                  }
                />
              ))}
          </SimpleSlider>
        </PlaylistContainer>
      )}

      {isAuthenticated && (
        <PlaylistContainer>
          <PlaylistTitle title="Semana 07" />
          <SimpleSlider>
            {videos
              .filter((v) => v.topico === "semana 07")
              .map((video) => (
                <Video
                  video={video}
                  key={video.id}
                  handleFavorite={handleFavorite}
                  checkIThatVideoIsAfavoriteVideo={
                    checkIThatVideoIsAfavoriteVideo
                  }
                />
              ))}
          </SimpleSlider>
        </PlaylistContainer>
      )}

      {isAuthenticated && (
        <PlaylistContainer>
          <PlaylistTitle title="Semana 08" />
          <SimpleSlider>
            {videos
              .filter((v) => v.topico === "semana 08")
              .map((video) => (
                <Video
                  video={video}
                  key={video.id}
                  handleFavorite={handleFavorite}
                  checkIThatVideoIsAfavoriteVideo={
                    checkIThatVideoIsAfavoriteVideo
                  }
                />
              ))}
          </SimpleSlider>
        </PlaylistContainer>
      )}

      {isAuthenticated && (
        <PlaylistContainer>
          <PlaylistTitle title="Monitoria" />
          <SimpleSlider>
            {videos
              .filter((v) => v.topico === "monitoria")
              .map((video) => (
                <Video
                  video={video}
                  key={video.id}
                  handleFavorite={handleFavorite}
                  checkIThatVideoIsAfavoriteVideo={
                    checkIThatVideoIsAfavoriteVideo
                  }
                />
              ))}
          </SimpleSlider>
        </PlaylistContainer>
      )}
    </div>
  );
};

export default Playlist;
