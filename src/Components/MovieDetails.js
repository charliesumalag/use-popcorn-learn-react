import React, {useState, useEffect} from 'react'
import Loader from "./Loader";
import StarRating from "./StarRating";
import { useKey } from '../useKey';

const KEY = "f84fc31d";

const MovieDetails = ({selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const [userRating, setUserRating] = useState('');

   const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
   const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;


   const {Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre} = movie;

   function handleAdd(params) {
     const newWatchedMovie = {
       imdbID: selectedId,
       title,
       year,
       poster,
       imdbRating: Number(imdbRating),
       runtime: Number(runtime.split(" ").at(0)),
       userRating,
     }
     onAddWatched(newWatchedMovie);
     onCloseMovie();
   }
   useKey('Escape', onCloseMovie);
    // useEffect(() => {
    //   function callback(e) {
    //     if(e.code === 'Escape'){
    //       onCloseMovie();
    //     }
    //   }
    //   document.addEventListener('keydown',callback)
    //   return function (params) {
    //     document.removeEventListener('keydown' , callback);
    //   }
    // },[onCloseMovie]);

   useEffect(() => {
    if(!title) return;
    document.title = `Movie : ${title}`;

    return function (params) {
      document.title = 'usePopcorn'
    }
   },[title]);


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
          { !isWatched ?
            <>
              <StarRating maxRating={10} size={24}  onSetRating={setUserRating} />
              { userRating > 0 && (<button onClick={handleAdd} className='btn-add'>+ Add to list</button>)}
            </>
            :
            <p>You rated this movie {watchedUserRating} <span>⭐</span>  </p>
          }
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

export default MovieDetails
