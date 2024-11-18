import UseConcursos from "../../hooks/UseConcurso";
import { useFavoritos } from "../../hooks/useFavoritos";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import styles from "./ConcursoList.module.css";

const ConcursoList = ({uf, setUf}) => {
  const { concursos, loading } = UseConcursos(uf);
  const { adicionarFavorito, removerFavorito, isFavorito } = useFavoritos();

  const handleFavorito = (e, concurso) => {
    e.preventDefault();
    if (isFavorito(concurso.id)) {
      removerFavorito(concurso.id);
    } else {
      adicionarFavorito({
        id: concurso.id,
        name: concurso.name,
        link: concurso.link
      });
    }
  };

  if (loading) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Concursos</h1>

      <div className={styles.buttonContainer}>
        <button className={styles.buttonUf} onClick={() => setUf("ac")}>AC</button>
        <button className={styles.buttonUf} onClick={() => setUf("al")}>AL</button>
        <button className={styles.buttonUf} onClick={() => setUf("am")}>AM</button>
        <button className={styles.buttonUf} onClick={() => setUf("ap")}>AP</button>
        <button className={styles.buttonUf} onClick={() => setUf("ba")}>BA</button>
        <button className={styles.buttonUf} onClick={() => setUf("ce")}>CE</button>
        <button className={styles.buttonUf} onClick={() => setUf("df")}>DF</button>
        <button className={styles.buttonUf} onClick={() => setUf("es")}>ES</button>
        <button className={styles.buttonUf} onClick={() => setUf("go")}>GO</button>
        <button className={styles.buttonUf} onClick={() => setUf("ma")}>MA</button>
        <button className={styles.buttonUf} onClick={() => setUf("mg")}>MG</button>
        <button className={styles.buttonUf} onClick={() => setUf("ms")}>MS</button>
        <button className={styles.buttonUf} onClick={() => setUf("mt")}>MT</button>
        <button className={styles.buttonUf} onClick={() => setUf("pa")}>PA</button>
        <button className={styles.buttonUf} onClick={() => setUf("pb")}>PB</button>
        <button className={styles.buttonUf} onClick={() => setUf("pe")}>PE</button>
        <button className={styles.buttonUf} onClick={() => setUf("pi")}>PI</button>
        <button className={styles.buttonUf} onClick={() => setUf("pr")}>PR</button>
        <button className={styles.buttonUf} onClick={() => setUf("rj")}>RJ</button>
        <button className={styles.buttonUf} onClick={() => setUf("rn")}>RN</button>
        <button className={styles.buttonUf} onClick={() => setUf("ro")}>RO</button>
        <button className={styles.buttonUf} onClick={() => setUf("rr")}>RR</button>
        <button className={styles.buttonUf} onClick={() => setUf("rs")}>RS</button>
        <button className={styles.buttonUf} onClick={() => setUf("sc")}>SC</button>
        <button className={styles.buttonUf} onClick={() => setUf("se")}>SE</button>
        <button className={styles.buttonUf} onClick={() => setUf("sp")}>SP</button>
        <button className={styles.buttonUf} onClick={() => setUf("to")}>TO</button>
      </div>
      
      <div className={styles.concursoGrid}>
        {concursos.map((concurso, index) => (
          <div key={index} className={styles.concursoCard}>
            <div className={styles.cardContent}>
              <a
                href={concurso.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.concursoLink}
              >
                <h3 className={styles.concursoName}>{concurso.name}</h3>
              </a>
              <button
                onClick={(e) => handleFavorito(e, concurso)}
                className={`${styles.favoritoBtn} ${isFavorito(concurso.id) ? styles.favorito : ''}`}
                aria-label={isFavorito(concurso.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                {isFavorito(concurso.id) ? 
                  <AiFillHeart className={styles.heartIcon} /> : 
                  <AiOutlineHeart className={styles.heartIcon} />
                }
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConcursoList;