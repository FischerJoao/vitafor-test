import { Footer } from "./components/Footer";
import NavBar from "./components/NavBar";
import { AppRoutes } from "./routes";

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-page-background">
      <NavBar />
      <main className="flex-grow-1 bg-page-background mt-4">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
