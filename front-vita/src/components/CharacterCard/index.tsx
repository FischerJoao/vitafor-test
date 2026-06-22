import { Link } from "react-router-dom";

type CharacterCardProps = {
  id: number;
  name: string;
  species: string;
  gender: string;
  location: {
    name: string;
    url: string;
  };
  image: string;
  url?: string;
  currentPage: number;
  to?: string;
  showGender?: boolean;
  showLocation?: boolean;
  showUrl?: boolean;
};

export const CharacterCard = ({
  id,
  name,
  species,
  gender,
  location,
  url,
  image,
  currentPage,
  to,
  showGender = true,
  showLocation = true,
  showUrl = true,
}: CharacterCardProps) => {
  return (
    <div
      className="card p-2 bg-white shadow-sm h-100 bg-surface zoom-img "
      style={{ width: "14rem", height: "24rem" }}
    >
      {" "}
      <Link
        to={to || `/character/${id}?page=${currentPage}`}
        className="text-decoration-none d-block h-100"
      >
        <div className="overflow-hidden">
          <img
            src={image}
            className="card-img-top border border-secondary zoom-img "
            alt={name}
            style={{ height: "180px", objectFit: "cover" }}
          />
        </div>
      </Link>
      <div
        className="card-body border rounded border-secondary p-2 mt-2 d-flex flex-column overflow-hidden"
        style={{ minHeight: "9rem" }}
      >
        <Link
          to={to || `/character/${id}?page=${currentPage}`}
          className="text-decoration-none d-block h-100"
        >
          <h5
            className="card-title text-accent fs-6 mb-1 overflow-hidden"
            style={{ minHeight: "2.5rem" }}
          >
            {name}
          </h5>
          <p className="card-text text-muted small mb-1">Espécie: {species}</p>
          {showGender && (
            <p className="card-text text-muted small mb-1">Gênero: {gender}</p>
          )}
          {showLocation && (
            <p
              className="card-text text-muted small mb-0 mt-auto overflow-hidden"
              style={{ minHeight: "2.5rem" }}
            >
              Localização: {location.name}
            </p>
          )}
        </Link>
        {showUrl && (
          <p
            className="card-text text-muted small mb-0 mt-auto overflow-hidden"
            style={{ minHeight: "2.5rem" }}
          >
            <a
              href={url}
              style={{ textDecoration: "underline" }}
              target="_blank"
              rel="noreferrer"
              className="text-green"
            >
              Dados da API
            </a>
          </p>
        )}
      </div>
    </div>
  );
};
