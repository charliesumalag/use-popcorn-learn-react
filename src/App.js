import './App.css';
import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./movieData";

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Navbar(params) {

  return (
    <nav className="nav-bar">
      <Logo/>
      <Search />
      <NumResults />
    </nav>
  )
}
function NumResults(params) {
  return (
    <p className="num-results"> Found <strong>x</strong> results </p>
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

function Search(params) {
  const [query, setQuery] = useState("");

  return (
    <input className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)}/>
  )
}
function ListBox(params) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen1((open) => !open)} > {isOpen1 ? "-" : "+"} </button>
      {isOpen1 && (
        <MovieList />
      )}
    </div>
  )
}
function MovieList(params) {
  const [movies, setMovies] = useState(tempMovieData);
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  )
}
function Movie({movie}) {
  return (
    <li key={movie.imdbID}> <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p><span>🗓</span> <span>{movie.Year}</span> </p>
      </div>
    </li>
  )
}

function WatchBox(params) {
  const [isOpen2, setIsOpen2] = useState(true);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
  <div className="box">
    <button className="btn-toggle" onClick={() => setIsOpen2((open) => !open)} > {isOpen2 ? "–" : "+"} </button>
    {isOpen2 && (
      <>
        <WatchedSummary watched={watched}  />
        <WatchedMovieList watched={watched} />
        <ul className="list">
          {watched.map((movie) => (
            <li key={movie.imdbID}>
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <h3>{movie.Title}</h3>
              <div>
                <p><span>⭐️</span> <span>{movie.imdbRating}</span></p>
                <p><span>🌟</span><span>{movie.userRating}</span></p>
                <p><span>⏳</span><span>{movie.runtime} min</span></p>
              </div>
            </li>
          ))}
        </ul>
      </>
    )}
  </div>
)}

function WatchedMovieList({watched}) {
  return (
    <ul className="list">
          {watched.map((movie) => (
            <li key={movie.imdbID}>
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <h3>{movie.Title}</h3>
              <div>
                <p><span>⭐️</span> <span>{movie.imdbRating}</span></p>
                <p><span>🌟</span><span>{movie.userRating}</span></p>
                <p><span>⏳</span><span>{movie.runtime} min</span></p>
              </div>
            </li>
          ))}
        </ul>
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
function Main(params) {
  return (
    <main className="main">
        <ListBox/>
        <WatchBox />
      </main>
  )
}

function App() {

  return (
    <>
      <Navbar/>
      <Main />
    </>
  );
}

export default App;
