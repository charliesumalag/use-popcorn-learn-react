import './App.css';
import { useEffect, useState } from "react";
import { tempMovieData, tempWatchedData } from "./movieData";
import StarRating from "./StarRating";

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


// function WatchBox(params) {
//   const [isOpen2, setIsOpen2] = useState(true);
//   const [watched, setWatched] = useState(tempWatchedData);

//   return (
//   <div className="box">
//     <button className="btn-toggle" onClick={() => setIsOpen2((open) => !open)} > {isOpen2 ? "–" : "+"} </button>
//     {isOpen2 && (
//       <>
//         <WatchedSummary watched={watched}  />
//         <WatchedMovieList watched={watched} />
//         <ul className="list">
//           {watched.map((movie) => (
//             <li key={movie.imdbID}>
//               <img src={movie.Poster} alt={`${movie.Title} poster`} />
//               <h3>{movie.Title}</h3>
//               <div>
//                 <p><span>⭐️</span> <span>{movie.imdbRating}</span></p>
//                 <p><span>🌟</span><span>{movie.userRating}</span></p>
//                 <p><span>⏳</span><span>{movie.runtime} min</span></p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </>
//     )}
//   </div>
// )}

function Navbar({ children }) {

  return (
    <nav className="nav-bar">
      {children}
    </nav>
  )
}
function NumResults({movies}) {
  return (
    <p className="num-results"> Found <strong>{movies.length}</strong> results </p>
  )
}

function Logo(params) {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

function Search({query, setQuery}) {

  return (
    <input className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)}/>
  )
}
function Box({children}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)} > {isOpen ? "-" : "+"} </button>
      {isOpen && (
       children
      )}
    </div>
  )
}
function MovieList({movies, onSelectMovie}) {

  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <Movie movie={movie} onSelectMovie={onSelectMovie} key={movie.imdbID} />
      ))}
    </ul>
  )
}
function Movie({movie, onSelectMovie}) {
  return (
    <li onClick={ () => onSelectMovie(movie.imdbID)} key={movie.imdbID}> <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p><span>🗓</span> <span>{movie.Year}</span> </p>
      </div>
    </li>
  )
}

function MovieDetails({selectedId, onCloseMovie }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre} = movie;
  useEffect(() => {
    async function getMovieDetails(params) {
      setIsLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  },[selectedId]);

  return (
    <div className='details'>
      {isLoading ? <Loader /> :
      <>
      <header>
        <button className='btn-back' onClick={onCloseMovie}>&larr;</button>
        <img src={poster} alt={`Poster of ${movie}`} />
        <div className="details-overview">
          <h2> {title} </h2>
          <p>{released} &bull; {runtime}</p>
          <p>{genre}</p>
          <p><span>⭐</span>{imdbRating} IMDb rating</p>
        </div>
        </header>

        <section>
          <div className='rating'>
            <StarRating maxRating={10} size={24} />
          </div>
          <p><em>{plot}</em></p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
        </section>
        </>
        }
    </div>
  )

}



function WatchedMovieList({watched}) {
  return (
    <ul className="list">
          {watched.map((movie) => (
            <WatchedMovie movie={movie} key={movie.imdbID}/>
          ))}
        </ul>
  )
}
function WatchedMovie({movie}) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p><span>⭐️</span> <span>{movie.imdbRating}</span></p>
        <p><span>🌟</span><span>{movie.userRating}</span></p>
        <p><span>⏳</span><span>{movie.runtime} min</span></p>
      </div>
    </li>
  )
}

function WatchedSummary({watched}) {
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p><span>#️⃣</span><span>{watched.length} movies</span></p>
        <p><span>⭐️</span><span>{avgImdbRating}</span></p><p><span>🌟</span><span>{avgUserRating}</span></p>
        <p><span>⏳</span><span>{avgRuntime} min</span></p>
      </div>
    </div>
  )
}
function Main({children}) {
  return (
    <main className="main">
       {children}
      </main>
  )
}

function Loader() {
  return <p className='loader'>Loading....</p>;
}

function ErrorMessage({message}) {
  return <p className='error'><span>⛔</span>{message}</p>
}
const KEY = "f84fc31d";

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function handleCloseMovie(params) {
    setSelectedId('null');
  }

  function handleSelectMovie(id) {
    setSelectedId(selectedId => id === selectedId ? null : id);
  }

  useEffect(function(params) {
    async function fetchMovies () {
      try{
        setError('')
        setIsLoading(true);
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
        // console.log(res)
        if (!res.ok) throw new Error("Something went wrong with fetching movies");
        const data = await res.json();
        // console.log(data)
        if(data.Response === 'False') throw new Error("Movie not found");

        setMovies(data.Search);
        setIsLoading(false);
      }
      catch (err){
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
    console.log(movies);
  },[query]);
  return (
    <>
      <Navbar>
        <Logo/>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {
            selectedId ? <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie}  /> :
            <>
              <WatchedSummary watched={watched}  />
              <WatchedMovieList watched={watched} />
            </>
          }
        </Box>

      </Main>
    </>
  );
}

export default App;
