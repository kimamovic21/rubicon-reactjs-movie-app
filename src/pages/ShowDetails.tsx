import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchShowDetails } from "../slices/showDetailsSlice";

const ShowDetails: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchShowDetails(showId!));
  }, [dispatch, showId]);

  const { show, loading, error } = useSelector(
    (state: RootState) => state.showDetails,
  );

  if (loading) return <div className="mt-4 text-center">Loading...</div>;
  if (error) return <div className="mt-4 text-center">Error: {error}</div>;
  if (!show) return <div className="mt-4 text-center">No show details available</div>;

  return (
    <div className="mx-auto m-4 w-3/4 rounded-md p-4 shadow-xl">
      <h2 className="mb-4 text-2xl font-bold">Show Details</h2>
      <Link to="/" className="text-blue-500">
        Back to Home
      </Link>

      <div className="mt-5">
        {show.videos && show.videos.results.length > 0 ? (
          <div className="embed-responsive">
            <iframe
              title="Trailer"
              src={`https://www.youtube.com/embed/${show.videos.results[0].key}`}
              allowFullScreen
              className="h-96 w-full"
            />
          </div>
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
            alt={show.name}
            className="mx-auto w-48"
          />
        )}
        <div className="ml-4">
          <p className="m-1 p-2 text-xl text-center font-semibold">Title: {show.name}</p>
          <p className="mt-2"><b>Overview: </b>{show.overview}</p>
          <p className="mt-2"><b>Original Language: </b>{show.original_language}</p>
          <p className="mt-2"><b> Popularity: </b>{show.popularity}</p>
          <p className="mt-2"><b>First Air Date: </b>{show.first_air_date}</p>
          <p className="mt-2"><b>Vote Average: </b>{show.vote_average}</p>
          <p className="mt-2"><b>Vote Count: </b>{show.vote_count}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
