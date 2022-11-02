import React from 'react';
import LandingPageContainer from './Containers/LandingPageContainer';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import SignUpPage from './Components/SignUpPage';
import NoPage from './Components/NoPage';
import PublicMusicianContainer from './Containers/PublicMusicianContainer';

function App(){
  return (
    <div className=''>
      <Routes>
        <Route
          path="/"
          element={<LandingPageContainer />}
        />
        <Route
          path="signup"
          element={<SignUpPage />}
        />
        <Route
          path="musician/public/"
          element={<PublicMusicianContainer />}
        />
        <Route
          path="musician/:username"
          element={<SignUpPage />}
        />
        <Route
          path="*"
          element={<NoPage />}
        />
      </Routes>
    </div>
  );
}

export default App;