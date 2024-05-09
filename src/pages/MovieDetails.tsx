import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import YouTube from "react-youtube"; 

import { RootState } from "../redux/store";
import { fetchMovieDetails } from "../slices/movieDetailsSlice";

const MovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId!));
  }, [dispatch, movieId]);

  const { movie, loading, error } = useSelector(
    (state: RootState) => state.movieDetails,
  );

  if (loading) return <div className="mt-4 text-center">Loading...</div>;
  if (error) return <div className="mt-4 text-center">Error: {error}</div>;
  if (!movie) return <div className="mt-4 text-center">No movie details available</div>;

  return (
    <div className="mx-auto m-4 w-3/4 rounded-md p-4 shadow-xl">
      <h2 className="mb-4 text-2xl font-bold">Movie Details</h2>
      <Link to="/" className="text-blue-500">
        Back to Home
      </Link>

      <div className="mt-5">
        {movie.video && movie.video.results.length > 0 ? (
          <div className="p-5">
            <YouTube
              videoId={movie.video.results[0].key}
              opts={{ width: "100%"  }}
            />
          </div>
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="mx-auto w-48"
          />
        )}
        <div className="ml-4">
          <p className="m-1 p-2 text-xl text-center font-semibold">Title: {movie.title}</p>
          <p className="mt-2"><b>Overview: </b>{movie.overview}</p>
          <p className="mt-2"><b>Original Language: </b>{movie.original_language}</p>
          <p className="mt-2"><b> Popularity: </b>{movie.popularity}</p>
          <p className="mt-2"><b>Release Date: </b>{movie.release_date}</p>
          <p className="mt-2"><b>Vote Average: </b>{movie.vote_average}</p>
          <p className="mt-2"><b>Vote Count: </b>{movie.vote_count}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
