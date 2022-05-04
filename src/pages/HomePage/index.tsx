import { useEffect, useState } from "react";
import Playlist from "../../components/Playlist";
import Header from "../../components/Header";
import { VideoThumbnailProps } from "../../components/Video/VideoThumbnailTypes";
import apiClient from "../../services/api-client";
import { Footer } from "../../components/Footer";
import { CTASection } from "../../components/CTASection";
import { SpotlightSection } from "../../components/SpotlightSection";
import { Hero } from "../../components/Hero";

const HomePage = () => {
  const [videos, setVideos] = useState<VideoThumbnailProps[]>([]);
  const [favoriteVideos, setFavoriteVideos] = useState<VideoThumbnailProps[]>([],);
  const [loading, setLoading] = useState(false);

  const buscarVideos = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<VideoThumbnailProps[]>("/videos");
      setVideos(response.data);
    } catch (error) {
      console.log("Erro ao carregar vídeos");
    } finally {
      setLoading(false);
    }
  };

  const getFavoriteVideos = async () => {
    const url = `/videos/favoritos`;

    try {
      const response = await apiClient.get(url);
      setFavoriteVideos(response.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    buscarVideos();
    getFavoriteVideos();
  }, []);

  return (
    <>
      <Header buscarVideos={buscarVideos}/>
      <Hero />
      <Playlist videos={videos} favoriteVideos={favoriteVideos} getFavoriteVideos={getFavoriteVideos}/>
      <SpotlightSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default HomePage;
