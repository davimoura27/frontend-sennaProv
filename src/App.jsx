import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header/header";
import { Home } from "./Components/Home/home";
import { Favoritos } from "./Components/Favoritos/favoritos";
import { ThemeProvider } from "./contexts/ThemeContext";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
