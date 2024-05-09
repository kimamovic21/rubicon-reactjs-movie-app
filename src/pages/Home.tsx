import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { fetchMovies, searchMovies } from "../slices/moviesSlice";
import { fetchTVShows, searchTVShows } from "../slices/showsSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch<any>();

  const [showMovies, setShowMovies] = useState<boolean>(() => {
    const storedShowMovies = sessionStorage.getItem("showMovies");
    return storedShowMovies ? JSON.parse(storedShowMovies) : false;
  });
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    const storedSearchQuery = sessionStorage.getItem("searchQuery");
    return storedSearchQuery || "";
  });
  const [resultsLimit, setResultsLimit] = useState<number>(10);

  useEffect(() => {
    if (sessionStorage.getItem("showMovies") === null) {
      setShowMovies(false);
      sessionStorage.setItem("showMovies", JSON.stringify(false));
    }
  }, []);

  const movies = useSelector((state: RootState) => state.movies.movies);
  const tvShows = useSelector((state: RootState) => state.tvShows.tvShows);
  const loading = useSelector(
    (state: RootState) => state.movies.loading || state.tvShows.loading
  );
  const error = useSelector(
    (state: RootState) => state.movies.error || state.tvShows.error
  );

  useEffect(() => {
    sessionStorage.setItem("showMovies", JSON.stringify(showMovies));
  }, [showMovies]);

  useEffect(() => {
    if (showMovies) {
      dispatch(fetchMovies());
    } else {
      dispatch(fetchTVShows());
    }
  }, [dispatch, showMovies]);

  const handleMovieButtonClick = () => {
    setShowMovies(true);
    setResultsLimit(10);
  };

  const handleTVShowButtonClick = () => {
    setShowMovies(false);
    setResultsLimit(10);
  };

  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);

  useEffect(() => {
    if (debouncedSearchQuery.length >= 3) {
      if (showMovies) {
        dispatch(searchMovies(debouncedSearchQuery));
      } else {
        dispatch(searchTVShows(debouncedSearchQuery));
      }
    } else {
      if (showMovies) {
        dispatch(fetchMovies());
      } else {
        dispatch(fetchTVShows());
      }
    }
  }, [dispatch, showMovies, debouncedSearchQuery]);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSearchQuery(query);
    sessionStorage.setItem("searchQuery", query);
    setResultsLimit(query.length >= 3 ? 100 : 10);
  };

  return (
    <div className="m-2 w-full p-4">
      <h1 className="mt-2 text-center text-3xl ">
        Welcome to my Movies/TV Shows App
      </h1>
      <div className="mt-5 text-center">
        <button
          onClick={handleMovieButtonClick}
          className={`mr-4 rounded-md px-4 py-2 ${
            showMovies ? "bg-blue-500 text-white" : "bg-white text-blue-500"
          }`}
        >
          Movies
        </button>
        <button
          onClick={handleTVShowButtonClick}
          className={`rounded-md px-4 py-2 ${
            !showMovies ? "bg-blue-500 text-white" : "bg-white text-blue-500"
          }`}
        >
          TV Shows
        </button>
      </div>
      <div className="mt-5">
        <input
          type="text"
          placeholder="Search For Your Favorite Movie or TV Show..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        <div className="card-container mt-5 grid gap-10 sm:grid-cols-2">
          {(showMovies
            ? movies.slice(0, resultsLimit)
            : tvShows.slice(0, resultsLimit)
          ).map((item: any) => (
            <Link
              key={item.id}
              to={`/${showMovies ? "movie" : "show"}/${item.id}`}
            >
              <div className="flex flex-col rounded-lg shadow-xl">
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={showMovies ? item.title : item.name}
                  className="rounded-lg"
                />
                <p className="p-4 text-center">
                  {showMovies ? item.title : item.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
