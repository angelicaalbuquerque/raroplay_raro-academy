import { Routes, Route } from "react-router-dom";
import { useAuthenticated, VerifyAuth } from "./components/VerifyAuth";
import { CadastroPage } from "./pages/CadastroPage";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RecuperarSenhaPage } from "./pages/RecuperarSenhaPage";
import { VisualizacaoVideosPage } from "./pages/VisualizacaoVideosPage";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/cadastro" element={<CadastroPage />}></Route>
      <Route path="/recuperar-senha" element={<RecuperarSenhaPage />}></Route>            
              
      <Route element={<VerifyAuth />}>
        <Route path="/" element={<HomePage />} />        
        <Route path="/videos/:id" element={<VisualizacaoVideosPage />}></Route>        
      </Route>

      <Route path="*" element={<NotFoundPage />}></Route>   
    </Routes>
  );
};
