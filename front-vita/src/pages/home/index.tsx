import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CharacterCard } from "../../components/CharacterCard";
import { Pagination } from "../../components/Pagination";
import { fetchCharacters } from "../../services/rickAndMorty";
import type { RickAndMortyCharacter } from "../../types/Character";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = useState<RickAndMortyCharacter[]>([]);
  const currentPage = Number(searchParams.get("page") || "1");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function handleData() {
      window.scrollTo({ top: 0, behavior: "smooth" });

      setLoading(true);

      const data = await fetchCharacters(currentPage);

      if (!data) {
        console.error("Failed to fetch characters.");
        setLoading(false);
        return;
      }

      setCharacters(data.results);
      setTotalPages(data.info.pages);
      setLoading(false);
    }

    handleData();
  }, [currentPage]);

  return (
    <div className="container ">
      <div>
        <h1 className="text-center text-green fw-bold title-home">
          Personagens
        </h1>
      </div>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            name={character.name}
            species={character.species}
            gender={character.gender}
            location={character.location}
            image={character.image}
            url={character.url}
            currentPage={currentPage}
          />
        ))}
      </div>

      {loading && (
        <p className="text-center text-muted">Carregando personagens...</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setSearchParams({ page: String(page) })}
      />
    </div>
  );
}

export default Home;
