import React from 'react';
import SearchInput from '../Components/SearchInput';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {styles} from '../styles';
import { style } from '@mui/system';

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
  }


  // ridiculously, some filler such as the following line needs to be here, otherwise the login2 function gets red-squiggled by the linter.
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











  ///////// TO BE REMOVED after moving this to musician private page
  
  const getAllPlaylists = async () => {

    const res = await fetch('/api/getAllPlaylists');
    console.log('res data in getAllPlaylists function (in LandingPageContainer) is:', res);
    if (res.status !== 200) {
      console.log('error getting all playlists');
      return;
    }
    const playlists = await res.json();
    console.log('playlists is:', playlists);
  }


  const getPlaylist = async () => {
    
    // here's a hard-coded playlist id attached to ethan's spotify account:
    // const playlistId = '1dNwPETQVowrqMwUILsiaz';
    // const playlistId = '20AQPwz2tutPb3XLSlReGE';

    // and here's a PRIVATE playlist attached to aaron's spotify account. and it works from aaron's account but not from ethan's!
    const playlistId = '5cpnzcAZTtQl17IlPNucht';


    const res = await fetch(`/api/getPlaylist/${playlistId}`);
    console.log('res data in getPlaylist function (in LandingPageContainer) is:', res);
    if (res.status !== 200) {
      console.log('error getting playlist');
      return;
    }
    const playlist = await res.json();
    console.log('playlist is:', playlist);
  }




  return(
    // this className used to have "landing-page" in it, which seems not to do anything at the moment (it should be a custom tailwind class or something).
    <div className="flex flex-col items-center">
      <h1 className ="fl text-4xl font-bold text-fuchsia-700 mx-10 my-5">Welcome to Human Jukebox!</h1>
      <br />
      <SearchInput />
      <br />
      <button onClick={login} className={styles.buttonBig}>
        Spotify signup/login for musicians
      </button>


      <br />

      <br />

      <br />





      {/* the placement of these buttons is temporary, just to save a step of clickthrough when testing. later, delete them as well as the functions above. */}

      <button onClick={getAllPlaylists} className={styles.buttonBig}>
        test: get my playlists
      </button>

      <button onClick={getPlaylist} className={styles.buttonSmall}>
        test: get a playlist
      </button>






      {/* <br />
      <Link to="/DNE">
        a Link to a route that DNE
      </Link> */}
    
    </div>
  )
}

export default LandingPageContainer;