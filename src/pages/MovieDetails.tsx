import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchMovieDetails } from '../slices/movieDetailsSlice';

const MovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId!));
  }, [dispatch, movieId]);

  const { movie, loading, error } = useSelector((state: RootState) => state.movieDetails);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4">Error: {error}</div>;
  if (!movie) return <div className="text-center mt-4">No movie details available</div>;

  return (
    <div className="mt-4 p-2 mx-auto w-3/4 shadow-xl rounded-md">
      <h2 className="text-2xl font-bold mb-4">Movie Details</h2>
      <Link to='/' className='text-blue-500'>Back to Home</Link>

      <div className="mt-5">
        {movie.video && movie.video.results.length > 0 ? (
          <div className="embed-responsive">
            <iframe
              title="Trailer"
              src={`https://www.youtube.com/embed/${movie.video.results[0].key}`}
              allowFullScreen
              className="w-full h-96"
            />
          </div>
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="w-48 mx-auto"
          />
        )}
        <div className="ml-4">
          <p className="font-semibold text-center">Title: {movie.title}</p>
          <p className="mt-2">Overview: {movie.overview}</p>
          <p className="mt-2">Original Language: {movie.original_language}</p>
          <p className="mt-2">Popularity: {movie.popularity}</p>
          <p className="mt-2">Release Date: {movie.release_date}</p>
          <p className="mt-2">Vote Average: {movie.vote_average}</p>
          <p className="mt-2">Vote Count: {movie.vote_count}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
