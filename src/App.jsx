import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/card/Card";
import CardModal from "./components/modal/CardModal";
import Loading from "./components/loading/Loading";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://swapi.dev/api/people?page=${page}`);
      const newData = await response.json();
      setData(newData.results);
      setPages(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Star Wars Characters</h1>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <ul className="characters-list">
            {data.map((character) => (
              <li key={character.name}>
                <Card data={character} />
              </li>
            ))}
          </ul>
          <div className="app-buttons">
            <button onClick={prevPage} disabled={page === 1}>
              Previous
            </button>
            <button onClick={nextPage} disabled={page === 9}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
