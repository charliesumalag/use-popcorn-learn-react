import React, {useState, useEffect} from 'react'
import Loader from "./Loader";
import StarRating from "./StarRating";

const KEY = "f84fc31d";

const MovieDetails = ({selectedId, onCloseMovie, onAddWatched }) => {
  const [movie, setMovie] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const [userRating, setUserRating] = useState('');


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
             <StarRating maxRating={10} size={24}  onSetRating={setUserRating} />
            { userRating > 0 && <button onClick={handleAdd} className='btn-add'>+ Add to list</button>}
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
