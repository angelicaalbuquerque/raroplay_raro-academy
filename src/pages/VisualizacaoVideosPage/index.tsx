import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthenticated } from "../../components/VerifyAuth";
import { VideoThumbnailProps } from "../../components/Video/VideoThumbnailTypes";
import { VideoPlayer } from "../../components/VideoPlayer";
import { VideosLaterais } from "../../components/VideosLaterais";
import { Comment } from "../../components/Comment";
import { Button } from "../../components/Button";
import apiClient from "../../services/api-client";
import Header from "../../components/Header";
import "./videoPageStyle.css";

export const VisualizacaoVideosPage = () => {
  const [video, setVideo] = useState<VideoThumbnailProps>(
    {} as VideoThumbnailProps
  );
  const [input, setInput] = useState("");
  const [videosLaterais, setVideosLaterais] = useState<VideoThumbnailProps[]>(
    []
  );
  const [comentarios, setComentarios] = useState([]);
  const { isAuthenticated } = useAuthenticated();

  const { id } = useParams();
  const { nome, topico } = video;

  const [favoriteVideos, setFavoriteVideos] = useState<VideoThumbnailProps[]>(
    []
  );

  const getFavoriteVideos = async () => {
    const url = `/videos/favoritos`;

    try {
      const response = await apiClient.get(url);
      setFavoriteVideos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const playListVideos = videosLaterais
    .filter((v) => v.topico === topico && v.nome !== nome)
    .map((vl) => (
      <VideosLaterais
        videoLateral={vl}
        key={vl.id}
        favoriteVideos={favoriteVideos}
        getFavoriteVideos={getFavoriteVideos}
      />
    ));

  async function loadVideo() {
    const response = await apiClient.get(`/videos/${id}`);
    setVideo(response.data);
  }

  async function listVideos() {
    const response = await apiClient.get(`/videos`);
    setVideosLaterais(response.data);
  }

  const comments = async () => {
    const response = await apiClient.get(`/videos/${id}/comentarios`);
    setComentarios(response.data);
  };

  const newComment = async (e: any) => {
    e.preventDefault();

    if (input) {
      await apiClient.post(`/videos/${id}/comentarios`, { texto: input });
      comments();
      setInput("");
    }
  };

  useEffect(() => {
    comments();
    loadVideo();
    listVideos();
    getFavoriteVideos();
  }, []);

  useEffect(() => {
    loadVideo();
    comments();
  }, [id]);

  return (
    <>
      <Header />
      <div className="video-container">
        <div className="video">
          <div className="videoxd">
            <VideoPlayer
              video={video}
              favoriteVideos={favoriteVideos}
              getFavoriteVideos={getFavoriteVideos}
            />
            <p className="totalComentarios">{comentarios.length} Comentários</p>
            {isAuthenticated ? (
              <form onSubmit={newComment} className="form">
                <input
                  type="text"
                  value={input}
                  placeholder="adicionar comentário..."
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button type="submit">enviar</Button>
              </form>
            ) : (
              <p className="videoText">
                Faça <Link to="/login">login</Link> para adicionar comentários.
              </p>
            )}
            {comentarios
              .slice(0)
              .reverse()
              .map((comentario: any) => (
                <Comment
                  comentario={comentario}
                  key={comentario.id}
                  comments={comments}
                />
              ))}
          </div>
          <div className="videos-laterais">
            <div>
              <h2>Playlist {topico}</h2>
            </div>
            <div className="videos-laterais-container">
              {!isAuthenticated && nome === "aulão" ? (
                <p>Faça login para ter acesso aos videos da Playlist.</p>
              ) : (
                new Set(playListVideos)
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
