import React from 'react';
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

  // fetch musician's public info from database
  const response = useFetch(`/api/info_public/${handle}`, {headers: {accept: 'application/json'}});
  const publicMusicianInfo = response.data
  const error = response.error;
  console.log('in PublicMusicianContainer, info is:', publicMusicianInfo)

  if (error) {
    return <NoMusicianPage handle={handle} />
  }

  if (publicMusicianInfo) {
    return(

      <div className="Public-musician flex flex-col items-center">

      <Link to="/">
        <button className='border-2 border-black rounded font-bold text-fuchsia-700 mx-10 my-5 px-2 rounded-full'>
          Home
        </button>
      </Link>

      <PublicMusicianInfo info={publicMusicianInfo} />

      <br />

      <SongDisplayContainer handle={handle} />
    
    </div>

    )
  }
  
  else {
    return(
      <div>
        {/* this is a placeholder: an empty div is returned while the status of info is unresolved */}
      </div>
    )
  }
}



export default PublicMusicianContainer;