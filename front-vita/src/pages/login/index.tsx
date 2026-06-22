import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function isPasswordValid(password: string) {
  const hasMinLength = password.length >= 5;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasMinLength && hasLetter && hasNumber;
}

export default function Login() {
  const navigate = useNavigate();
  const { login, register, logout, user, isAuthenticated } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const isRegister = mode === "register";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (isRegister) {
        if (!isPasswordValid(password)) {
          setError(
            "A senha deve ter no mínimo 5 caracteres, com pelo menos 1 letra e 1 número.",
          );
          setLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setError("As senhas não coincidem.");
          setLoading(false);
          return;
        }

        await register({
          name,
          email,
          password,
        });

        setMode("login");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSuccessMessage("Cadastro realizado com sucesso. Faça seu login.");
        navigate("/login");
        return;
      } else {
        await login({
          email,
          password,
        });
      }

      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError("Erro ao fazer login ou cadastro.");
        console.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  if (isAuthenticated && user) {
    return (
      <div className="container py-4 py-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <div className="card shadow mx-auto">
              <div className="card-header bg-secondary text-center py-3">
                <h4 className="mb-0 text-uppercase text-black">Conta ativa</h4>
              </div>

              <div className="card-body p-4 text-center">
                <h1 className="fw-bold title-home mb-3">Ola, {user.name}</h1>
                <p className="text-muted mb-4">
                  Voce ja esta autenticado nesta sessao.
                </p>

                <button
                  type="button"
                  className="btn bg-secondary px-4"
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 py-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow mx-auto bg-surface">
            <div className="card-header bg-secondary text-white text-center py-3">
              <h4 className="mb-0 text-uppercase text-black">
                {isRegister ? "Criar Conta" : "Acessar Conta"}
              </h4>
            </div>

            <div className="card-body p-3 p-md-4 ">
              <form onSubmit={handleSubmit}>
                {isRegister && (
                  <div className="row g-3 align-items-center mb-3">
                    <label
                      htmlFor="inputName"
                      className="col-12 col-md-3 col-form-label text-md-end text-white"
                    >
                      Nome:
                    </label>
                    <div className="col-12 col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="row g-3 align-items-center mb-1 mb-3">
                  <label
                    htmlFor="inputEmail"
                    className="col-12 col-md-3 col-form-label text-md-end text-white"
                  >
                    E-mail:
                  </label>
                  <div className="col-12 col-md-9">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row g-3 align-items-center mb-3">
                  <label
                    htmlFor="inputPassword"
                    className="col-12 col-md-3 col-form-label text-md-end text-white"
                  >
                    Senha:
                  </label>
                  <div className="col-12 col-md-9">
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder="Sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      minLength={5}
                      required
                    />
                    {isRegister && (
                      <small className="text-muted">
                        Minimo de 5 caracteres, com letra e numero.
                      </small>
                    )}
                  </div>
                </div>

                {isRegister && (
                  <div className="row g-3 align-items-center mb-3">
                    <label
                      htmlFor="inputConfirmPassword"
                      className="col-12 col-md-3 col-form-label text-md-end text-white"
                    >
                      Confirmar:
                    </label>
                    <div className="col-12 col-md-9">
                      <input
                        type="password"
                        className="form-control"
                        id="inputConfirmPassword"
                        placeholder="Confirme sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
                {error && (
                  <div className="row mb-3">
                    <div className="col-12 col-md-9 offset-md-3">
                      <p className="text-danger small mb-0">{error}</p>
                    </div>
                  </div>
                )}
                {successMessage && (
                  <div className="row mb-3">
                    <div className="col-12 col-md-9 offset-md-3">
                      <p className="text-success small mb-0">
                        {successMessage}
                      </p>
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="col-12 col-md-9 offset-md-3">
                    <div className="d-grid gap-2 d-md-flex align-items-md-center">
                      <button
                        type="submit"
                        className="btn bg-secondary px-4"
                        disabled={loading}
                      >
                        {loading
                          ? "Entrando..."
                          : isRegister
                            ? "Cadastrar"
                            : "Entrar"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMode(isRegister ? "login" : "register");
                          setError("");
                          setSuccessMessage("");
                        }}
                        className="btn btn-link btn-sm text-decoration-none px-0 ms-md-2 text-accent"
                      >
                        {isRegister ? "Voltar para login" : "Cadastre-se"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
