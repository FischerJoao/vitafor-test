import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { saveCharacter } from "../../services/api";
import { fetchCharacterById } from "../../services/rickAndMorty";
import { useAuth } from "../../context/useAuth";
import type { RickAndMortyCharacter } from "../../types/Character";

function CharacterDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const [character, setCharacter] = useState<RickAndMortyCharacter | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);

  useEffect(() => {
    async function loadCharacter() {
      if (!id) {
        return;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });

      setLoading(true);

      const data = await fetchCharacterById(id);

      if (data) {
        setCharacter(data);
      }

      setLoading(false);
    }

    loadCharacter();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <p className="text-center text-muted mt-4">Personagem nao encontrado.</p>
    );
  }

  async function handleSaveCharacter() {
    if (!character) {
      return;
    }

    if (!isAuthenticated) {
      setFeedback({
        type: "danger",
        message: "Você precisa estar logado para salvar personagens.",
      });
      return;
    }

    try {
      await saveCharacter({
        name: character.name,
        species: character.species,
        image: character.image,
        url: character.url,
      });

      setFeedback({
        type: "success",
        message: "Personagem salvo com sucesso.",
      });
    } catch (error) {
      setFeedback({
        type: "danger",
        message:
          error instanceof Error ? error.message : "Erro ao salvar personagem.",
      });
    }
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

              <div className="mb-4">
                <p className="text-uppercase text-accent fw-semibold small mb-2">
                  Detalhes do personagem
                </p>
                <h1 className="h2 text-light fw-bold mb-0">{character.name}</h1>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-12 col-sm-6">
                  <div className="rounded-4 border border-secondary-subtle p-3 h-100">
                    <p className="small text-uppercase text-accent mb-1">
                      Espécie
                    </p>
                    <p className="text-light mb-0">{character.species}</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="rounded-4 border border-secondary-subtle p-3 h-100">
                    <p className="small text-uppercase text-accent mb-1">
                      Gênero
                    </p>
                    <p className="text-light mb-0">{character.gender}</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="rounded-4 border border-secondary-subtle p-3 h-100">
                    <p className="small text-uppercase text-accent mb-1">
                      Status
                    </p>
                    <p className="text-light mb-0">{character.status}</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="rounded-4 border border-secondary-subtle p-3 h-100">
                    <p className="small text-uppercase text-accent mb-1">
                      Localização
                    </p>
                    <p className="text-light mb-0">{character.location.name}</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="rounded-4 border border-secondary-subtle p-3 h-100">
                    <p className="small text-uppercase text-accent mb-1">URL</p>
                    <p className="text-light mb-0 text-break">
                      {character.url}
                    </p>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end mt-auto">
                <button
                  type="button"
                  className="btn bg-secondary px-4 py-2"
                  onClick={handleSaveCharacter}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
