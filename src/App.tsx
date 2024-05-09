import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import Wrapper from './components/Wrapper';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import ShowDetails from './pages/ShowDetails';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Wrapper>
        <Router>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/movie/:movieId" element={<MovieDetails />} />
            <Route path="/show/:showId" element={<ShowDetails />} />
          </Routes>
        </Router>
      </Wrapper>
    </Provider>
  );
};

export default App;
