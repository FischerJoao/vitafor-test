import { useEffect, useState } from "react";
import { CharacterCard } from "../../components/CharacterCard";
import { getSavedCharacters } from "../../services/api";
import { useAuth } from "../../context/useAuth";
import type { SavedCharacter } from "../../types/SavedCharacter";

function SavedCharacters() {
  const { isAuthenticated } = useAuth();
  const [characters, setCharacters] = useState<SavedCharacter[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);

  useEffect(() => {
    async function loadSavedCharacters() {
      if (!isAuthenticated) {
        return;
      }

      setLoading(true);

      try {
        const data = await getSavedCharacters();
        setCharacters(data.characters);
      } catch (error) {
        setFeedback({
          type: "danger",
          message:
            error instanceof Error
              ? error.message
              : "Erro ao carregar personagens salvos.",
        });
      } finally {
        setLoading(false);
      }
    }

    loadSavedCharacters();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning" role="alert">
          Você precisa estar logado para ver personagens salvos.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-green">Personagens Salvos</h1>
      </div>

      {feedback && (
        <div className={`alert alert-${feedback.type}`} role="alert">
          {feedback.message}
        </div>
      )}

      {loading && <p className="text-center text-muted">Carregando...</p>}

      {!loading && characters.length === 0 && (
        <p className="text-center text-muted">Nenhum personagem salvo ainda.</p>
      )}

      <div className="d-flex flex-wrap justify-content-center gap-3">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            name={character.name}
            species={character.species}
            gender=""
            location={{ name: character.url, url: character.url }}
            image={character.image}
            url={character.url}
            currentPage={1}
            to={`/saved-characters/${character.id}`}
            showGender={false}
            showLocation={false}
            showUrl={true}
          />
        ))}
      </div>
    </div>
  );
}

export default SavedCharacters;
