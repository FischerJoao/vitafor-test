export interface RickAndMortyCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  url: string;
  location: {
    name: string;
    url: string;
  };
}

export interface RickAndMortyResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: RickAndMortyCharacter[];
}
