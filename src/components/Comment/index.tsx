import "./comment.css";
import thumbsUpOutline from "../../assets/icons/elements/thumbs-up-outline.svg";
import thumbsUpFilled from "../../assets/icons/elements/thumbs-up-filled.svg";
import thumbsDownOutline from "../../assets/icons/elements/thumbs-down-outline.svg";
import thumbsDownFilled from "../../assets/icons/elements/thumbs-down-filled.svg";
import deleteSvg from "../../assets/icons/elements/delete.svg";
import editSvg from "../../assets/icons/elements/edit.svg";
import apiClient from "../../services/api-client";
import { useParams } from "react-router-dom";
import { useState } from "react";

type CommentProps = {
  comments: () => Promise<void>;
  comentario: {
    id: string;
    upVotes: string;
    downVotes: string;
    meuVote: {
      vote: string;
    };
    texto: string;
    aluno: {
      nome: string;
      id: string;
      foto: string;
    };
  };
};

export const Comment = ({ comentario, comments }: CommentProps) => {
  const ID = localStorage.getItem("id");
  const { id } = useParams();

  const [edit, setEdit] = useState(false);
  const [novoTexto, setNovoTexto] = useState("");

  const curtir = async () => {
    if (comentario.meuVote?.vote === "up") {
      await apiClient.delete(
        `/videos/${id}/comentarios/${comentario.id}/votes`
      );
      return comments();
    }
    await apiClient.put(`/videos/${id}/comentarios/${comentario.id}/votes`, {
      vote: "up",
    });
    comments();
  };

  const descurtir = async () => {
    if (comentario.meuVote?.vote === "down") {
      await apiClient.delete(
        `/videos/${id}/comentarios/${comentario.id}/votes`
      );
      return comments();
    }
    await apiClient.put(`/videos/${id}/comentarios/${comentario.id}/votes`, {
      vote: "down",
    });
    comments();
  };

  const deleteComment = async () => {
    await apiClient.delete(`/videos/${id}/comentarios/${comentario.id}`);
    comments();
    setEdit(false);
  };

  const editComment = () => {
    setEdit(!edit);
  };

  const editarComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (novoTexto) {
      await apiClient.patch(`/videos/${id}/comentarios/${comentario.id}`, {
        texto: novoTexto,
      });
      setEdit(false);
      comments();
      setNovoTexto("");
    }
  };

  return (
    <div className="comment">
      <img src={comentario.aluno.foto} alt="" />
      <div className="ttttttttt">
        <h2>{comentario.aluno.nome}</h2>
        <div className="commentBox">
          <p className={edit ? "bbb" : ""}>{comentario.texto}</p>
          <div className="editComment">
            {comentario.aluno.id === ID ? (
              <form onSubmit={editarComment}>
                <input
                  type="text"
                  value={novoTexto}
                  placeholder="Edite o seu comentário..."
                  onChange={(e) => setNovoTexto(e.target.value)}
                  className={edit ? "aaa" : "bbb"}
                />
              </form>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="thumbs">
          <div className="votes">
            <div className="x">
              <img
                src={
                  comentario.meuVote?.vote === "up"
                    ? thumbsUpFilled
                    : thumbsUpOutline
                }
                alt=""
                onClick={curtir}
              />
              {comentario.upVotes}
            </div>
            <div className="x">
              <img
                src={
                  comentario.meuVote?.vote === "down"
                    ? thumbsDownFilled
                    : thumbsDownOutline
                }
                alt=""
                onClick={descurtir}
              />
              {comentario.downVotes}
            </div>
          </div>
          <div className="xx">
            <div className="xx-options">
              {comentario.aluno.id === ID ? (
                <img src={deleteSvg} alt="" onClick={deleteComment} />
              ) : (
                <></>
              )}
              {comentario.aluno.id === ID ? (
                <img src={editSvg} alt="" onClick={editComment} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
