import React from 'react';
import SearchInput from '../Components/SearchInput';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {styles} from '../styles';

function LandingPageContainer(){


  const navigate = useNavigate();
  
  // navigate to a musician's public page if client requests not just root but also with a valid query parameter.
  const searchParams = (new URL((document as any).location)).searchParams;
  const handle = searchParams.get("handle");
  const spotifyId = searchParams.get("spotifyId");
  const possiblyNavigateToPublicPage = async () => {
    console.log(`inside of possiblyNavigateToPublicPage, handle is ${handle}, and spotifyId = ${spotifyId}`);
    // first try handle, if it exists.
    if (handle) {
      const resFromHandle = await fetch(`/api/info_public/${handle}`);
      const dataFromHandle = await resFromHandle.json();
      if (dataFromHandle.handle) {
        return navigate(`/musician/public?musician=${handle}`);
      }
    }
    // if handle doesn't exist as a query parameter or in the database, then try the spotify id.
    const resFromSpotifyId = await fetch(`/api/getHandle/${spotifyId}`);
    const dataFromSpotifyId = await resFromSpotifyId.json();
    if (dataFromSpotifyId.success) {
      return navigate(`/musician/public?musician=${dataFromSpotifyId.handle}`);
    }
  }
  if (handle || spotifyId) {
    possiblyNavigateToPublicPage();
  }
  

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
      console.log('inside of the "login" function, the cookies matched')
      navigate(`/musician/private?musician=${resObj.handle}`);
    } else {
      console.log('inside of the "login" function, cookies did not exist or did not match');
      const newWindow = window.open('/api/auth');
    }
  };


  // this is nearly a copy of the login function above (both are used!), but living on the window instead of in local memory. of course, ideal would be to get the login function living on the window, but for some reason typescript is unhappy with that.
  (window as any).login2 = async function () {
    console.log('login2 triggered');
    const res = await fetch('/api/checkCookies');
    console.log('res data is:', res.status);
    const resObj = await res.json();
    console.log('resObj data is:', resObj);
    if (resObj.cookieMatch) {
      // any existing musician should have chosen a handle, so the truthiness of resObj.handle is a good proxy. (it's actually possible for a musician to not choose a handle, by exiting out partway through the signup flow, but then they really should go through it again anyways.)
      if (resObj.handle) {
        navigate(`/musician/private?musician=${resObj.handle}`);
      } else {
        navigate('/musician/private/signup/');
      }
    }
  };


  return(
    // this className used to have "landing-page" in it, which seems not to do anything at the moment (it should be a custom tailwind class or something).
    <div className="flex flex-col justify-end justify-items-center items-center place-content-center">
      
      <h1 className={styles.h1Text}>Welcome to Human Jukebox!</h1>
      
      {/* <br /> */}
      
      <SearchInput />
    
      
      {/* <br /> */}
      
      
      <span>
        check out a sample musician page: &nbsp;
        <Link
          to="/musician/public?musician=jimi-hendrix"
          className={styles.textButtonForDbUpdates}
        >
          here
        </Link>
      </span>

      <br />
      <br />
      <br />
      <br />
      <br />

      <span>
        <b>for musicians: &nbsp;</b>
        <button onClick={login} className={styles.buttonSpotify}>
          signup/login via Spotify
        </button>
      </span>
      <h6 className='flex flex-row justify-center text-xs text-gray-500'>(If this doesn't work on your phone, try it on a computer.)</h6>

      {/* <br />
      <Link to="/DNE">
        a Link to a route that DNE
      </Link> */}
    
    </div>
  )
}

export default LandingPageContainer;