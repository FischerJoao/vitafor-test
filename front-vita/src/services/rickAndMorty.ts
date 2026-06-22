import type { RickAndMortyResponse } from "../types/Character";
import type { RickAndMortyCharacter } from "../types/Character";

const BASE_URL =
  import.meta.env.VITE_RICK_AND_MORTY_API_URL ||
  "https://rickandmortyapi.com/api";

export async function fetchCharacters(
  page: number,
): Promise<RickAndMortyResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/character?page=${page}`);

    if (!response.ok) {
      throw new Error(`HTTP, status: ${response.status}`);
    }

    const data: RickAndMortyResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return null;
  }
}

export async function fetchCharacterById(
  id: string,
): Promise<RickAndMortyCharacter | null> {
  try {
    const response = await fetch(`${BASE_URL}/character/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP, status: ${response.status}`);
    }

    const data: RickAndMortyCharacter = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching character:", error);
    return null;
  }
}
