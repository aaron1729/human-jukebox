import React, { useEffect, useState } from 'react';
import { useFetch } from 'react-async';
import SongDisplayContainer from './SongDisplayContainer';
import { useSearchParams, Link } from 'react-router-dom';
import PublicMusicianInfo from '../Components/PublicMusicianInfo';
import NoMusicianPage from '../Components/NoMusicianPage';


function PublicMusicianContainer(){

  // get query parameter from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const handle = searchParams.get('musician');
  console.log('inside of PublicMusicianContainer component, and handle (coming from query parameter) is:', handle);

  // musician info
  type PublicMusicianInfo = {
    handle: string,
    bio?: string,
    display_name?: string,
    instagram_show?: boolean,
    instagram?: string,
    venmo_show?: boolean,
    venmo?: string,
    spotify_playlist_id?: string,
    spotify_playlist_name?: string,
    spotify_playlist_url?: string,
    loading?: boolean
  }

  const [publicMusicianInfo, setPublicMusicianInfo] = useState<PublicMusicianInfo>({handle: handle, loading: true});

  // fetch musician info from database
  const getPublicMusicianInfo = async () => {
    const response = await fetch(`/api/info_public/${handle}`);
    const info = await response.json();
    console.log('in getMusicianInfo function in PublicMusicianContainer component, musician info from database is:', info);
    setPublicMusicianInfo(info);
  }

  // see the description of useEffect in SongDisplayContainer.
  useEffect(
    () => {getPublicMusicianInfo()},
    []
  );

    return(

      <div className="flex flex-col items-center">

        {!publicMusicianInfo.loading && !publicMusicianInfo.display_name && <NoMusicianPage handle={handle} />}

        {!publicMusicianInfo.loading && publicMusicianInfo.display_name && 

        <div className="flex flex-col items-center">

      <Link to="/">
        <button className='border-2 border-black rounded font-bold text-fuchsia-700 mx-10 my-5 px-2 rounded-full'>
          Home
        </button>
      </Link>

      <PublicMusicianInfo info={publicMusicianInfo} />

      <br />

      <SongDisplayContainer handle={handle} />

      <br />

      </div>

        }
    
    </div>

    )
  // }
  
  // else {
  //   return(
  //     <div>
  //       {/* this is a placeholder: an empty div is returned while the status of info is unresolved */}
  //     </div>
  //   )
  // }
}



export default PublicMusicianContainer;