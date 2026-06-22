import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import CharacterDetails from "../pages/character";
import Login from "../pages/login";
import About from "../pages/about";
import SavedCharacters from "../pages/savedCharacteres";
import SavedCharacterDetails from "../pages/savedCharacteres/details";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/character/:id" element={<CharacterDetails />} />
      <Route path="/saved-characters" element={<SavedCharacters />} />
      <Route
        path="/saved-characters/:id"
        element={<SavedCharacterDetails />}
      />
      <Route path="/sobre" element={<About />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
