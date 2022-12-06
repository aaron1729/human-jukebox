import React from 'react';
import LandingPageContainer from './Containers/LandingPageContainer';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import NoPage from './Components/NoPage';
import PublicMusicianContainer from './Containers/PublicMusicianContainer';
import PrivateMusicianContainer from './Containers/PrivateMusicianContainer';


function App(){
  return (
    <div className=''>
      <Routes>
        <Route
          path="/"
          element={<LandingPageContainer />}
        />
        <Route
          path="musician/public/"
          element={<PublicMusicianContainer />}
        />
        <Route
          path="musician/private/"
          element={<PrivateMusicianContainer />}
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