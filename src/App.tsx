import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import ShowDetails from './pages/ShowDetails';

// const API_KEY = import.meta.env.VITE_API_KEY; 
// const API_TOKEN = import.meta.env.VITE_API_TOKEN; 

// test
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer ${API_TOKEN}`
//   }
// };

// fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`, options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className='flex justify-center max-w-[80%] m-auto'>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/movie/:movieId" element={<MovieDetails />} />
            <Route path="/show/:showId" element={<ShowDetails />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
