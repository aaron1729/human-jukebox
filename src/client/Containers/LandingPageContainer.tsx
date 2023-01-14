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
      console.log('inside of the "login" function, the cookies matched')
      navigate(`/musician/private?musician=${resObj.handle}`);
    } else {
      console.log('inside of the "login" function, cookies did not exist or did not match');
      const newWindow = window.open('/api/auth');
    }
  };

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
  };

  return(
    // this className used to have "landing-page" in it, which seems not to do anything at the moment (it should be a custom tailwind class or something).
    <div className="flex flex-col justify-end justify-items-center items-center place-content-center">
      <h1 className ="fl text-3xl font-bold text-fuchsia-700 mx-5 my-10">Welcome to Human Jukebox!</h1>
      <br />
      <SearchInput />
      <br />
      <button onClick={login} className={styles.buttonBig}>
        Spotify signup/login for musicians
      </button>

      {/* <br />
      <Link to="/DNE">
        a Link to a route that DNE
      </Link> */}
    
    </div>
  )
}

export default LandingPageContainer;