import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header/header";
import { Home } from "./Components/Home/home";
import { Favoritos } from "./Components/Favoritos/favoritos";
import { ThemeProvider } from "./contexts/ThemeContext";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute"
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // Verifique se há um usuário no localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.token) {
      setUser(storedUser);
    }
  }, []);
  
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Header user={user} /> {/* Passando o usuário logado para o Header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={
           <PrivateRoute>
             <Favoritos />
           </PrivateRoute> 
            } 
          />
        </Routes>
      </ThemeProvider> 
    </BrowserRouter>
  );
}

export default App;
//renomear os services
//organizar os pags 
//proteger as rotas por senha(favoritos)