import React from 'react'
import Movie from "./Movie";

const MovieList = ({movies, onSelectMovie, watched}) => {
    return (
        <ul className="list list-movies">
          {movies.map((movie) => (
            <Movie movie={movie} onSelectMovie={onSelectMovie} watched={watched} key={movie.imdbID} />
          ))}
        </ul>
      )
}

export default MovieList
