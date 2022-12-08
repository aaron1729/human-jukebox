import React from 'react';
import PublicMusicianContainer from './PublicMusicianContainer';
import SongDisplayContainer from './SongDisplayContainer';
import { useSearchParams, Link } from 'react-router-dom';
import { useFetch } from 'react-async';


function PrivateMusicianContainer(){

  // get query parameter from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const handle = searchParams.get('musician');
  console.log('inside of PrivateMusicianContainer component, and handle (coming from query parameter) is:', handle);

  // fetch musician's private info from database
  const response = useFetch(`/api/info_private/${handle}`, {headers: {accept: 'application/json'}});
  const info = response.data;
  const error = response.error;
  console.log('in PrivateMusicianContainer, and info is:', info);




  const deleteCookies = () => {
    fetch('/api/logout')
  }

  if (info) {
    return(
      <div className="private-musician flex flex-col items-center">


      <span className="flex flex-row">

      <Link to="/">
        <button className='border-2 border-black rounded font-bold text-fuchsia-700 mx-10 my-5 px-2 rounded-full'>
          Home
        </button>
      </Link>

      <Link to="/">
        <button onClick={deleteCookies} className='border-2 border-black rounded font-bold text-fuchsia-700 mx-10 my-5 px-2 rounded-full'>
          Logout
        </button>
      </Link>

      </span>

      spotify id: {(info as any).spotify_id}
      <br />
      handle: {(info as any).handle}
      <br />
      display name: {(info as any).display_name}
      <br />
      instagram: {(info as any).instagram}
      <br />
      show instagram link on public page: {(info as any).instagram_show.toString()}
      <br />
      venmo: {(info as any).venmo}
      <br />
      show venmo link on public page: {(info as any).venmo_show.toString()}
      <br />
      bio: {(info as any).bio}
      <br />
      spotify playist id: {(info as any).spotify_playlist_id}
      <br />

      <b>here will be input fields so that the musician can edit their name, handle, venmo link, bio, etc.</b>

      <br />


      {/* <MusicianInfo /> */}
      {/* <AddSong /> */}
      {
        /*contains all of the musician data:
        bio, venmo, songs, tags, edit options
        */
      }


      {/* <PublicMusicianContainer /> */}


      <SongDisplayContainer handle={handle} />
    </div>
  )
}
}

export default PrivateMusicianContainer;
