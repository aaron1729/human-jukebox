import React from 'react';
import SearchInput from '../Components/SearchInput';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {styles} from '../styles';

// /Users/aaron/git/human-jukebox/src/client/styles.js



function LandingPageContainer(){

  const navigate = useNavigate();
  

  const login = async function () {
    const res = await fetch('/api/checkCookies');
    // console.log('typeof res is: ', typeof res);
    // console.log('some bit of res is: ', res.body);
    if (res.status !== 200) {
      console.log('error checking cookies against db');
      return;
    }
    const resObj = await res.json();
    // console.log('the stuff is: ', resObj);
    if (resObj.cookieMatch) {
      console.log('in function login, cookies matched')
      navigate(`/musician/private?musician=${resObj.handle}`);
    } else {
      console.log('in function login, cookies did not exist or did not match');
      const newWindow = window.open('/api/auth');
    }
  }


  // ridiculously, some filler needs to be here otherwise the login2 function gets red-squiggled
  const B: number = 7;


  // this is essentially a copy of the login function above (both are used!), but living on the window instead of in local memory. of course, ideal would be to get the login function living on the window, but for some reason typescript is unhappy with that.
  (window as any).login2 = async function () {
    console.log('login2 triggered');
    const res = await fetch('/api/checkCookies');
    console.log('res data is:', res.status);
    const resObj = await res.json();
    console.log('resObj data is:', resObj);
    if (resObj.cookieMatch) {
      navigate(`/musician/private?musician=${resObj.handle}`);
    }
  }



  const getAllPlaylists = () => {
    fetch('/api/getAllPlaylists')
  }


  return(
    <div className="landing-page flex flex-col items-center">
      <h1 className ="fl text-4xl font-bold text-fuchsia-700 mx-10 my-5">Welcome to Human Jukebox!</h1>
      <br />
      <SearchInput />
      <br />
      <button onClick={login} className={styles.buttonBig}>
        Spotify signup/login for musicians
      </button>


      <br />


      {/* this placement is temporary, just to save a step of clickthrough when testing. */}
      <button onClick={getAllPlaylists} className={styles.buttonBig}>
        Get My Playlists
      </button>

      <div id="playlists-modal">
        test div "playlists-modal"
      </div>


      {/* <br />
      <Link to="/DNE">
        a Link to a route that DNE
      </Link> */}
    </div>
  )
}

export default LandingPageContainer;