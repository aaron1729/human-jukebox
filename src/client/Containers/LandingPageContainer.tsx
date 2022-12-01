import React from 'react';
import SearchInput from '../Components/SearchInput';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import PrivateMusicianContainer from './PrivateMusicianContainer';



function LandingPageContainer(){

  const navigate = useNavigate();

  const login = async function () {
    const res = await fetch('/api/checkCookies');
    console.log('typeof res is: ', typeof res);
    console.log('some bit of res is: ', res.body);
    if (res.status !== 200) {
      console.log('error checking cookies against db');
      return;
    }
    const resObj = await res.json();
    console.log('the stuff is: ', resObj);
    if (resObj.cookieMatch) {
      navigate(`/musician/private?artist=${resObj.handle}`);
    } else {
      console.log('cookies did not exist or did not match');
      const newWindow = window.open('http://localhost:8080/api/auth');
    }
  }






  const authWindow = async () => {
    const response = await fetch('/api/checkCookies');
    const answer = await response.json()
    console.log('inside the authWindow function, answer.key is: ', answer.key);
    const newWindow = window.open('http://localhost:8080/api/auth');
  }

  (window as any).testFunc = async (str: string) => {
    console.log('testFunc was triggered! and the argument is: ' + str)
    return 5
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
      <br />
      <button onClick={authWindow} className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-4 mt-5 mb-10 rounded-full">
        Spotify signup/login for musicians
      </button>
      <br />
      <SearchInput />
      <br />
      <button onClick={login}>temp button to test login function</button>

      <br />
      <Link to="/DNE">
        a Link to a route that DNE
      </Link>
    </div>
  )
}

export default LandingPageContainer;