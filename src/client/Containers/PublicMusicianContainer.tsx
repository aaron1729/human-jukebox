import React from 'react';
import SongDisplayContainer from './SongDisplayContainer';
import { useSearchParams, Link } from 'react-router-dom';
import MusicianInfo from '../Components/MusicianInfo';


function PublicMusicianContainer(){

  // figure out how to get query param from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const handle = searchParams.get('musician');
  console.log('inside of PublicMusicianContainer component, and handle is:', handle);


  //  className="landing-page flex flex-col items-center"
  return(
    <div className="Public-musician flex flex-col items-center">

      <Link to="/">
        <button className='border-2 border-black rounded font-bold text-fuchsia-700 mx-10 my-5 px-2 rounded-full'>
          Home
        </button>
      </Link>

      <MusicianInfo handle={handle} />

      <br />

      <SongDisplayContainer handle={handle} />
    </div>
  ) 
}

export default PublicMusicianContainer;