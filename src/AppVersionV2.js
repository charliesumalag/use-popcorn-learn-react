import './css/App.css';
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Logo from "./Components/Logo";
import Search from "./Components/Search";
import NumResults from "./Components/NumResults";
import Main from "./Components/Main";
import Box from "./Components/Box";
import Loader from "./Components/Loader";
import MovieList from "./Components/MovieList";
import MovieDetails from "./Components/MovieDetails";
import ErrorMessage from "./Components/ErrorMessage";
import WatchedSummary from "./Components/WatchedSummary";
import WatchedMovieList from "./Components/WatchedMovieList";
import { useLocalStorageState } from './useLocalStorageState';

const KEY = "f84fc31d";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [watched, setWatched] = useLocalStorageState([], 'watched');

  function handleCloseMovie(params) {
    setSelectedId(null);
  }

  function handleSelectMovie(id) {
    setSelectedId(selectedId => id === selectedId ? null : id);
  }

  function handleDeleteWatched(id) {
    console.log(id);
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  useEffect(function(params) {
    const controller =  new AbortController();
    async function fetchMovies () {
      try{
        setError('')
        setIsLoading(true);
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal});

        if (!res.ok) throw new Error("Something went wrong with fetching movies");
        const data = await res.json();

        if(data.Response === 'False') throw new Error("Movie not found");

        setMovies(data.Search);
        setError('');
        setIsLoading(false);
      }
      catch (err){
        if(err.name !== 'AbortError'){
          setError(err.message);
        }
        setError(err.message);
      }
      finally{
        setIsLoading(false);

      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }
    fetchMovies();

    return function () {
      controller.abort();
    }

  },[query]);

  function  handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
    console.log('new saved data to watched');
  }

  return (
    <>
      <Navbar>
        <Logo/>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} watched={watched} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {
            selectedId ? <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched} watched={watched}  /> :
            <>
              <WatchedSummary watched={watched}  />
              <WatchedMovieList onDeleteWatched={handleDeleteWatched} watched={watched} />
            </>
          }
        </Box>

      </Main>
    </>
  );
}

export default App;
