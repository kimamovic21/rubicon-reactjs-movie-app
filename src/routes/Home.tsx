import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, searchMovies } from '../slices/moviesSlice';
import { fetchTVShows, searchTVShows } from '../slices/showsSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const [showMovies, setShowMovies] = useState<boolean>(() => {
    const storedShowMovies = sessionStorage.getItem('showMovies');
    return storedShowMovies ? JSON.parse(storedShowMovies) : false;
  });

  const [searchQuery, setSearchQuery] = useState(() => {
    const storedSearchQuery = sessionStorage.getItem('searchQuery');
    return storedSearchQuery || '';
  });

  const { movies, tvShows, loading, error } = useSelector((state: RootState) => ({
    movies: state.movies.movies,
    tvShows: state.tvShows.tvShows,
    loading: state.movies.loading || state.tvShows.loading,
    error: state.movies.error || state.tvShows.error,
  }));

  useEffect(() => {
    if (sessionStorage.getItem('showMovies') === null) {
      setShowMovies(false);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('showMovies', JSON.stringify(showMovies));
  }, [showMovies]);

  useEffect(() => {
    if (showMovies) {
      if (searchQuery.length >= 3) {
        dispatch(searchMovies(searchQuery));
      } else {
        dispatch(fetchMovies());
      }
    } else {
      if (searchQuery.length >= 3) {
        dispatch(searchTVShows(searchQuery));
      } else {
        dispatch(fetchTVShows());
      }
    }
  }, [dispatch, showMovies, searchQuery]);

  const handleMovieButtonClick = () => {
    setShowMovies(true);
  };

  const handleTVShowButtonClick = () => {
    setShowMovies(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    sessionStorage.setItem('searchQuery', query);
  };

  return (
    <div className='m-2 p-4 w-full'>
      <h1 className='mt-2 text-center text-3xl'>Welcome to my Movies/TV Shows App</h1>
      <div className='mt-5 text-center'>
        <button
          onClick={handleMovieButtonClick}
          className={`px-4 py-2 mr-4 rounded-md ${
            showMovies ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
          }`}
        >
          Movies
        </button>
        <button
          onClick={handleTVShowButtonClick}
          className={`px-4 py-2 rounded-md ${
            !showMovies ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
          }`}
        >
          TV Shows
        </button>
      </div>
      <div className='mt-5'>
        <input 
          type='text' 
          placeholder='Search For Your Favorite Movie or TV Show...' 
          className='px-4 w-full py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        <div className="mt-5 card-container grid grid-cols-2 gap-10">
          {showMovies ? (
            movies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <div className="flex flex-col shadow-xl rounded-lg">
                  <img 
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                    alt={movie.title} 
                    className='rounded-lg'
                  />
                  <p className='text-center p-4'>{movie.title}</p>
                </div>
              </Link>
            ))
          ) : (
            tvShows.map((show) => (
              <Link key={show.id} to={`/show/${show.id}`}>
                <div className="flex flex-col shadow-xl rounded-lg">
                  <img 
                    src={`https://image.tmdb.org/t/p/w300${show.poster_path}`} 
                    alt={show.name} 
                    className='rounded-lg'
                  />
                  <p className='text-center p-4'>{show.name}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
