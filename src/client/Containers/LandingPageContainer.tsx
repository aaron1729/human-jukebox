import React from 'react';
import SearchInput from '../Components/SearchInput';
import SpotifySignIn from '../Components/SpotifySignIn';
import SignUpPage from '../Components/SignUpPage';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import PrivateMusicianContainer from './PrivateMusicianContainer';









function LandingPageContainer(){

  const navigate = useNavigate();

  const handleButtonClickTemp = () => {
    navigate('/signup');
  }

  const authWindow = async () => {
    const response = await fetch('/api/checkCookies');
    const answer = await response.json()
    console.log('inside the authWindow function, answer.key is: ', answer.key);
    const newWindow = window.open('http://localhost:8080/api/auth');
  }

  
  (window as any).toPrivate = async (handle: string, access: string) => {
    const response = await fetch(`/api/dbAuth/${handle}/${access}`);
    console.log('typeof response is:', typeof response);
    const verified = await response.json();
    console.log('verified is: ', verified);
    console.log('typeof verified is: ', typeof verified);
    if (verified.success) {
      navigate(`/musician/private?artist=${handle}`);
    } else {
      console.log('error: verification unsuccessful')
    }
    return verified;
  }


  return(
    <div className="landing-page flex flex-col items-center">
      <h1 className ="fl text-4xl font-bold text-fuchsia-700 mx-10 my-5">Welcome to Human Jukebox!</h1>
      <hr />
      <SpotifySignIn />
      <hr />
      <button onClick={authWindow} className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-4 mt-5 mb-10 rounded-full">
        new button: Signup/Login with Spotify!
      </button>
      <br />
      <SearchInput />
      <br />
      <br />
      <Link to="signup">
        <button className='border-2 border-black rounded font-bold text-fuchsia-700 mx-10 my-5 px-2 rounded-full'>
          Sign Up
        </button>
      </Link>
      <br />
      <Link target="_blank" to="api/auth">
        a Link to the api/auth route (handled by the server, opened in a new tab)
      </Link>
      <br />
      {/* <a href="https://www.google.com" target="_blank">a good ol' a-tag, opening google in a new tab</a>
      <br /> */}
      <button onClick={handleButtonClickTemp}>
        a button that uses useNavigate to go to the signup page
      </button>
      <br />
      {/* <button onClick={() => navigate('/musician/private?artist=abc')}>
        another button that uses useNavigate
      </button>
      <br /> */}
      {/* <Link to="musician/private/">
        a Link to musician/private/
      </Link>
      <br /> */}
      {/* <Link to="DNE">
        a Link to a route that Does Not Exist (which triggers the catch-all Route "NoPage")
      </Link>
      <br /> */}
      {/* <PrivateMusicianContainer /> */}
    </div>
  )
}

export default LandingPageContainer;