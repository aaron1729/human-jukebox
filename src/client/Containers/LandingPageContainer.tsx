import React from 'react';
import SearchInput from '../Components/SearchInput';
import SpotifySignIn from '../Components/SpotifySignIn';
import SignUpPage from '../Components/SignUpPage';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import PrivateMusicianContainer from './PrivateMusicianContainer';

function LandingPageContainer(){

  const navigate = useNavigate();

  const handleButtonClick = () => {
    // USING THIS AS A TEST FOR useNavigate and for redirecting purposes
    navigate('/signup');
  }

  return(
    <div className="landing-page flex flex-col items-center">
      <h1 className ="fl text-4xl font-bold text-fuchsia-700 mx-10 my-5">Welcome to Human Jukebox!</h1>
      <SpotifySignIn />
      <hr/>
      <h1 className='mb-5 font-bold'>OR</h1>
      <SearchInput />
      <Link target="_blank" to="api/abc">
        {/* this prop used to be to="signup" */}
        <button className='border-2 border-black rounded font-bold text-fuchsia-700 mx-10 my-5 px-2 rounded-full'>Sign Up</button> </Link>
      <br />
      {/* <button onClick={handleButtonClick}>NEW BUTTON HERE</button> */}
      <PrivateMusicianContainer />
    </div>
  )
}

export default LandingPageContainer;