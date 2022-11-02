import React from 'react';
import SearchInput from '../Components/SearchInput';
import SpotifySignIn from '../Components/SpotifySignIn';
import SignUpPage from '../Components/SignUpPage';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import PrivateMusicianContainer from './PrivateMusicianContainer';








function LandingPageContainer(){


  // to test the window for variables

  let myVariable: number = 0;
for(let i=0; i < 10; i++) {
  myVariable++
}

const myFunc = () => {
  myVariable++;
}





  const navigate = useNavigate();

  const handleButtonClick = () => {
    // USING THIS AS A TEST FOR useNavigate and for redirecting purposes
    navigate('/signup');
  }



  const authWindow = () => {
    const newWindow = window.open('http://localhost:8080/api/auth');
    // refer to main window as newWindow.opener
  }



  return(
    <div className="landing-page flex flex-col items-center">
      <h1 className ="fl text-4xl font-bold text-fuchsia-700 mx-10 my-5">Welcome to Human Jukebox!</h1>
      <hr />
      <SpotifySignIn />
      <hr />
      {/* the following button opens a new window (or tab) using window.open('http://localhost:8080/api/auth') -- so that this window is accessible therein as window.opener! */}
      <button onClick={authWindow}>
        new signup/login button
      </button>
      <br />
      <SearchInput />
      <br />
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
      <a href="https://www.google.com" target="_blank">a good ol' a-tag, opening google in a new tab</a>
      <br />
      <button onClick={handleButtonClick}>
        a button that uses useNavigate
      </button>
      <br />
      <Link to="DNE">
        a Link to a route that Does Not Exist (which triggers the catch-all Route "NoPage")
      </Link>
      <br />
      <PrivateMusicianContainer />
      <br />
      myVariable is: {myVariable}
    </div>
  )
}

export default LandingPageContainer;