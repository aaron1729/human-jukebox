import React from 'react';
import SearchInput from '../Components/SearchInput';
import SpotifySignIn from '../Components/SpotifySignIn';
import SignUpPage from '../Components/SignUpPage';

function LandingPageContainer(){
  return(
    <div className="landing-page">
      <h1 className ="bg-red-900 text-white">Welcome to Human Jukebox!</h1>
      <SpotifySignIn />
      <hr/>
      <SignUpPage />
      <hr/>
      <SearchInput/>
    </div>
  )
}

export default LandingPageContainer;