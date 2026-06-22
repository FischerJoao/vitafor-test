export default function About() {
  return (
    <div className="container py-4 py-md-5">
      <div className="row g-4 align-items-stretch mb-4">
        <div className="col-12 col-lg-4">
          <section
            className="card shadow-lg text-center p-4 p-md-5 h-100 bg-surface"
            style={stackCardStyle}
          >
            <div
              className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle border border-4"
              style={{
                width: "120px",
                height: "120px",
                color: "var(--color-secondary)",
                borderColor: "var(--color-secondary)",
              }}
            >
              <img
                src="src/assets/profile.jpeg"
                alt="Profile"
                className="rounded-circle"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <h1 className="display-5 fw-bold text-light mb-2">
              João Cunha Fischer
            </h1>
            <p className="fs-3 text-secondary-emphasis mb-4 text-accent">
              Full Stack Developer
            </p>
            <div className="d-flex justify-content-center gap-3 mb-3">
              <a
                href="https://github.com/FischerJoao"
                target="_blank"
                rel="noreferrer"
                className="d-inline-flex align-items-center justify-content-center rounded-circle text-light text-decoration-none fw-bold"
                title="GitHub"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "var(--color-accent)",
                }}
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/joao-fischer/"
                target="_blank"
                rel="noreferrer"
                className="d-inline-flex align-items-center justify-content-center rounded-circle text-light text-decoration-none fw-bold"
                title="LinkedIn"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "var(--color-accent)",
                }}
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="mailto:joao-fischer@hotmail.com"
                className="d-inline-flex align-items-center justify-content-center rounded-circle text-light text-decoration-none fw-bold"
                title="E-mail"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "var(--color-accent)",
                }}
              >
                <i className="bi bi-envelope-fill"></i>
              </a>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {[
                "TypeScript",
                "MySQL",
                "React",
                "React Native",
                "Ágil",
                "NestJS",
                "Git",
              ].map((skill) => (
                <span
                  key={skill}
                  className="badge fs-6 px-3 py-2"
                  style={{
                    backgroundColor: "#2b3342",
                    color: "var(--color-secondary)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="col-12 col-lg-8">
          <section
            className="card shadow-lg p-4 p-md-5 h-100 d-flex flex-column bg-surface"
            style={stackCardStyle}
          >
            <h2 className="text-light mb-4">Quem sou eu:</h2>
            <p className="fs-5 text-muted  text-muted mb-4">
              Graduado em Desenvolvimento de Software Multiplataforma pela Fatec
              Votorantim – Benedicto Pagliato. Atualmente, atuo como
              desenvolvedor full stack, com foco em web e mobile.
            </p>
            <p className="fs-5 text-muted text-muted mb-0">
              Gosto muito de tecnologia e sua capacidade de transformar pessoas.
              Além disso, sou chegado em games, música, livros e esportes.
            </p>
          </section>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column gap-4">
            <section
              className="card shadow-lg p-4 p-md-5 w-100 bg-surface"
              style={stackCardStyle}
            >
              <h2 className="fw-bold text-light mb-4">Experiência</h2>
              <div className="d-flex flex-column gap-3">
                <div className="p-3 rounded-4 w-100" style={projectCardStyle}>
                  <h3 className="h4 text-light mb-2">
                    👀 👀 Futuro Desenvolvedor Jr FullStack - VITAFOR 👀 👀
                  </h3>
                  <p className="text-muted mb-0"></p>
                </div>
                <div className="p-3 rounded-4 w-100" style={projectCardStyle}>
                  <h3 className="h4 text-light mb-2">
                    Desenvolvedor Jr Fullstack - MindGroup - Atual
                  </h3>
                  <p className="text-muted mb-0">
                    • Fullstack - React, React Native, JavaScript / TypeScript,
                    NextJS, NestJS, MySql,TypeORM, PrismaORM, Tailwind,
                    stylesSheet <br />
                    • Desenvolvimento de aplicativos mobile utilizando EXPO e
                    React Native <br />• Desenvolvimento FrontEnd com
                    componentes reutilizáveis <br />
                    • Desenvolvimento seguindo metodologia ágil, reports de
                    problemas e foco na solução <br />• Ideias e melhorias de
                    design do protótipo e fluxos das aplicações
                  </p>
                </div>
                <div className="p-3 rounded-4 w-100" style={projectCardStyle}>
                  <h3 className="h4 text-light mb-2">
                    Estagiário CBA - Companhia Brasileira de Alumínio - Março
                    2025{" "}
                  </h3>
                  <p className="text-muted mb-0">
                    • Desenvolvimento de cronograma para atualização de
                    servidores <br />
                    • Desenvolvimento de planilhas e dashboard para visualização
                    das atividades <br />
                    • Validação de mudanças e análise de requisitos <br />•
                    Indicadores de performance e acompanhamentos de incidentes{" "}
                    <br />• Suporte ao usuário e atuação junto a parceiros de
                    negócios <br />• Otimização do cadastro de equipamentos
                    utilizando ferramenta Selenium <br />
                    • Suporte ao usuário dos equipamentos de TI
                    <br />
                  </p>
                </div>
                <div className="p-3 rounded-4 w-100" style={projectCardStyle}>
                  <h3 className="h4 text-light mb-2">
                    Operador de produção - Schaeffler - Março 2023{" "}
                  </h3>
                  <p className="text-muted mb-0">
                    • Operação de máquinas e equipamentos <br />
                    • Operação na linha de produção e montagem <br />•
                    Indicadores de performance e comunicação com a equipe <br />
                  </p>
                </div>
              </div>
            </section>

            <section
              className="card shadow-lg p-4 p-md-5 w-100 bg-surface"
              style={stackCardStyle}
            >
              <h2 className="fw-bold text-light mb-4">Projetos</h2>
              <div className="d-flex flex-column gap-3">
                <a
                  href="https://github.com/CapitechDev"
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none"
                >
                  <div
                    className="h-100 p-4 w-100 mb-3"
                    style={{ ...projectCardStyle, cursor: "pointer" }}
                  >
                    <h3 className="h2 text-light mb-3">Projeto CapiTech.</h3>
                    <p className="fs-5 text-muted mb-0">
                      O projeto visa disseminar conhecimento tecnológico de
                      forma simplificada, em formato de posts e trilhas.
                      Realizei um pouco da documentação e relatórios para a
                      faculdade. Além disso, contribui para o design utilizando
                      o figma, front-end com react native e stylesheet.
                    </p>
                  </div>
                </a>
              </div>
              <div className="d-flex flex-column gap-3">
                <a
                  href="https://sobre-oque.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none"
                >
                  <div
                    className="h-100 p-4 w-100"
                    style={{ ...projectCardStyle, cursor: "pointer" }}
                  >
                    <h3 className="h2 text-light mb-3">Projeto SobreOque.</h3>
                    <p className="fs-5 text-muted mb-0">
                      Projeto simples inspirado no gerador de lero lero. Gera
                      textos a partir de uma lista de palavras relacionadas.
                      Utiliza Next e Tailwind
                    </p>
                  </div>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

const stackCardStyle = {
  border: "1px solid rgba(151, 206, 76, 0.18)",
  borderRadius: "24px",
};

const projectCardStyle = {
  border: "1px solid rgba(151, 206, 76, 0.12)",
  borderRadius: "20px",
};
