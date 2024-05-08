import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchShowDetails } from '../slices/showDetailsSlice';  

const ShowDetails: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShowDetails(showId)); 
  }, [dispatch, showId]);

  const { show, loading, error } = useSelector((state: RootState) => state.showDetails); 

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4">Error: {error}</div>;
  if (!show) return <div className="text-center mt-4">No show details available</div>;

  return (
    <div className="mt-4 p-2 mx-auto w-3/4 shadow-xl rounded-md">
      <h2 className="text-2xl font-bold mb-4">Show Details</h2>
      <Link to='/' className='text-blue-500'>Back to Home</Link>

      <div className="mt-5">
        {show.videos && show.videos.results.length > 0 ? (
          <div className="embed-responsive">
            <iframe
              title="Trailer"
              src={`https://www.youtube.com/embed/${show.videos.results[0].key}`}
              allowFullScreen
              className="w-full h-96"
            />
          </div>
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
            alt={show.name}
            className="w-48 mx-auto"
          />
        )}
        <div className="ml-4">
          <p className="font-semibold text-center">Title: {show.name}</p>
          <p className="mt-2">Overview: {show.overview}</p>
          <p className="mt-2">Original Language: {show.original_language}</p>
          <p className="mt-2">Popularity: {show.popularity}</p>
          <p className="mt-2">First Air Date: {show.first_air_date}</p>
          <p className="mt-2">Vote Average: {show.vote_average}</p>
          <p className="mt-2">Vote Count: {show.vote_count}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
