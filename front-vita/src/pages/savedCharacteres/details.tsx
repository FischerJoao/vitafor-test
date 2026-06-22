import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteSavedCharacter,
  getSavedCharacterById,
  updateSavedCharacter,
} from "../../services/api";
import { useAuth } from "../../context/useAuth";
import type { SavedCharacter } from "../../types/SavedCharacter";

function SavedCharacterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [character, setCharacter] = useState<SavedCharacter | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    url: "",
  });

  useEffect(() => {
    async function loadCharacter() {
      if (!id || !isAuthenticated) {
        return;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(true);

      try {
        const data = await getSavedCharacterById(Number(id));
        setCharacter(data.character);
        setFormData({
          name: data.character.name,
          species: data.character.species,
          url: data.character.url,
        });
      } catch (error) {
        setFeedback({
          type: "danger",
          message:
            error instanceof Error
              ? error.message
              : "Erro ao carregar personagem salvo.",
        });
      } finally {
        setLoading(false);
      }
    }

    loadCharacter();
  }, [id, isAuthenticated]);

  async function handleUpdate() {
    if (!character) {
      return;
    }

    try {
      await updateSavedCharacter(character.id, {
        ...formData,
        image: character.image,
      });

      setCharacter({
        ...character,
        ...formData,
        updated_at: new Date().toISOString(),
      });
      setIsEditing(false);
      setFeedback({
        type: "success",
        message: "Personagem atualizado com sucesso.",
      });
    } catch (error) {
      setFeedback({
        type: "danger",
        message:
          error instanceof Error
            ? error.message
            : "Erro ao atualizar personagem.",
      });
    }
  }

  async function handleDelete() {
    if (!character) {
      return;
    }

    try {
      await deleteSavedCharacter(character.id);
      navigate("/saved-characters");
    } catch (error) {
      setFeedback({
        type: "danger",
        message:
          error instanceof Error
            ? error.message
            : "Erro ao excluir personagem.",
      });
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning" role="alert">
          Você precisa estar logado para ver personagens salvos.
        </div>
      </div>
    );
  }

  if (loading) {
    return <p className="text-center text-muted py-4">Carregando...</p>;
  }

  if (!character) {
    return (
      <div className="container py-4">
        {feedback ? (
          <div className={`alert alert-${feedback.type}`} role="alert">
            {feedback.message}
          </div>
        ) : (
          <p className="text-center text-muted">
            Personagem salvo não encontrado.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div
        className="card mx-auto bg-surface shadow-lg border-0"
        style={{ maxWidth: "980px" }}
      >
        <div className="row g-0 align-items-stretch">
          <div className="col-12 col-md-5 col-lg-4 d-flex align-items-center justify-content-center p-4 p-lg-5">
            <img
              src={character.image}
              className="img-fluid rounded-circle border border-3 border-secondary"
              alt={character.name}
              style={{ width: "240px", height: "240px", objectFit: "cover" }}
            />
          </div>
          <div className="col-12 col-md-7 col-lg-8">
            <div className="card-body p-4 p-lg-5 d-flex flex-column h-100">
              {feedback && (
                <div className={`alert alert-${feedback.type}`} role="alert">
                  {feedback.message}
                </div>
              )}

              {isEditing ? (
                <>
                  <div className="mb-4">
                    <p className="text-uppercase text-accent fw-semibold small mb-2">
                      Editando personagem salvo
                    </p>
                    <h1 className="h2 text-light fw-bold mb-0">
                      {character.name}
                    </h1>
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-12 col-sm-6">
                      <div className="rounded-4 border border-secondary-subtle p-3 h-100">
                        <label className="small text-uppercase text-accent mb-2 d-block">
                          Nome
                        </label>
                        <input
                          className="form-control"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Nome"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="rounded-4 border border-secondary-subtle p-3 h-100">
                        <label className="small text-uppercase text-accent mb-2 d-block">
                          Especie
                        </label>
                        <input
                          className="form-control"
                          value={formData.species}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              species: e.target.value,
                            }))
                          }
                          placeholder="Espécie"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="rounded-4 border border-secondary-subtle p-3 h-100">
                        <label className="small text-uppercase text-accent mb-2 d-block">
                          URL
                        </label>
                        <input
                          className="form-control"
                          value={formData.url}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              url: e.target.value,
                            }))
                          }
                          placeholder="URL"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <p className="text-uppercase text-accent fw-semibold small mb-2">
                      Personagem salvo
                    </p>
                    <h1 className="h2 text-light fw-bold mb-0">
                      {character.name}
                    </h1>
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-12 col-sm-6">
                      <div className="rounded-4 border border-secondary-subtle p-3 h-100">
                        <p className="small text-uppercase text-accent mb-1">
                          Especie
                        </p>
                        <p className="text-light mb-0">{character.species}</p>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="rounded-4 border border-secondary-subtle p-3 h-100">
                        <p className="small text-uppercase text-accent mb-1">
                          Atualizado em
                        </p>
                        <p className="text-light mb-0">
                          {character.updated_at}
                        </p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="rounded-4 border border-secondary-subtle p-3 h-100">
                        <p className="small text-uppercase text-accent mb-1">
                          URL
                        </p>
                        <p className="text-light mb-0 text-break">
                          {character.url}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="d-flex gap-2 justify-content-end mt-auto">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="btn bg-secondary px-4 py-2"
                      onClick={handleUpdate}
                    >
                      Salvar edição
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4 py-2"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: character.name,
                          species: character.species,
                          url: character.url,
                        });
                      }}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn bg-secondary px-4 py-2"
                      onClick={() => setIsEditing(true)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger px-4 py-2"
                      onClick={handleDelete}
                    >
                      Excluir
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedCharacterDetails;
