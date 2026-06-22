import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const NavBar = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-navbar sticky-top">
        <div className="container-fluid px-4 px-lg-5">
          <NavLink
            to="/"
            className="navbar-brand d-flex align-items-center gap-2"
          >
            <img src="/src/assets/logo.png" alt="" width="50" height="50" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse  navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="nav nav-pills gap-4 ">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/saved-characters"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Personagens
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/sobre"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Sobre
                </NavLink>
              </li>
              <li className="nav-item">
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="nav-link border-0 bg-transparent"
                  >
                    Deslogar
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                  >
                    Login / registro
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
