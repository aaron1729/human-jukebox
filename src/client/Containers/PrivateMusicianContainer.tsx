import React from 'react';
import MusicianInfo from '../Components/MusicianInfo';
import PublicMusicianContainer from './PublicMusicianContainer';
import { Link } from 'react-router-dom';


function PrivateMusicianContainer(){

  const deleteCookies = () => {
    fetch('/api/logout')
  }

  return(
    <div className="private-musician flex flex-col items-center">
      this is the top of the Private Musician Container. here will be input fields so that the musician can edit their name, handle, venmo link, bio, etc.

      <br />

      <Link to="/">
        <button onClick={deleteCookies} className='border-2 border-black rounded font-bold text-fuchsia-700 mx-10 my-5 px-2 rounded-full'>
          Logout (delete cookies)
        </button>
      </Link>

      {/* <MusicianInfo /> */}
      {/* <AddSong /> */}
      {
        /*contains all of the musician data:
          bio, venmo, songs, tags, edit options
        */
      }
      <PublicMusicianContainer />
    </div>
  )
}

export default PrivateMusicianContainer;
