import { useState, useEffect } from 'react';

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favoritosStorage = localStorage.getItem('concursos-favoritos');
    if (favoritosStorage) {
      try {
        const favoritosParsed = JSON.parse(favoritosStorage);
        console.log('Favoritos carregados:', favoritosParsed);
        setFavoritos(favoritosParsed);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
        localStorage.removeItem('concursos-favoritos');
      }
    }
  }, []);

  const adicionarFavorito = (concurso) => {
    console.log('Adicionando favorito:', concurso);
    setFavoritos(prevFavoritos => {
      if (prevFavoritos.some(fav => fav.id === concurso.id)) {
        return prevFavoritos;
      }
      const novosFavoritos = [...prevFavoritos, concurso];
      localStorage.setItem('concursos-favoritos', JSON.stringify(novosFavoritos));
      return novosFavoritos;
    });
  };

  const removerFavorito = (id) => {
    console.log('Removendo favorito:', id);
    setFavoritos(prevFavoritos => {
      const novosFavoritos = prevFavoritos.filter(fav => fav.id !== id);
      localStorage.setItem('concursos-favoritos', JSON.stringify(novosFavoritos));
      return novosFavoritos;
    });
  };

  const isFavorito = (id) => {
    return favoritos.some(fav => fav.id === id);
  };

  return {
    favoritos,
    adicionarFavorito,
    removerFavorito,
    isFavorito
  };
}