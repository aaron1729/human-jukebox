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
      <SearchInput/>
      <Link to="signup"> <button className='border border-blue-700 rounded'>REDIRECT TO SIGN UP (TESTING REACT ROUTER)</button></Link>
      <br />
      <Link to="musician/public"> <button className='border border-blue-700 rounded'>REDIRECT TO PUBLIC ARTIST PAGE</button></Link>
      {/* <button onClick={handleButtonClick}>NEW BUTTON HERE</button> */}
      <PrivateMusicianContainer/>
    </div>
  )
}

export default LandingPageContainer;