import React from 'react';
import LandingPageContainer from './Containers/LandingPageContainer';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import NoPage from './Components/NoPage';
import PublicMusicianContainer from './Containers/PublicMusicianContainer';
import PrivateMusicianContainer from './Containers/PrivateMusicianContainer';
import HandleChooserContainer from './Containers/HandleChooserContainer';
import SignupContainer from './Containers/SignupContainer';

function App(){
  return (
    <div id="app">
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
          path="musician/private/handle/"
          element={<HandleChooserContainer />}
        />
        <Route
          path="musician/private/signup/"
          element={<SignupContainer />}
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