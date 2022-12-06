import React from 'react';
import SongDisplayContainer from './SongDisplayContainer';
import { useSearchParams, Link } from 'react-router-dom';
import MusicianInfo from '../Components/MusicianInfo';


function PublicMusicianContainer(){

  // get query parameter from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const handle = searchParams.get('musician');
  console.log('inside of PublicMusicianContainer component, and handle (coming from query parameter) is:', handle);


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



  /*


  // get musician's info from db (and in particular, find out if they're there)
  const getMusicianInfo = async () => {
    const response = await fetch(`/api/info_public/${handle}`);
    const info = await response.json();
    console.log('info from getMusicianInfo:', info);
    return info;
  }

  const info = getMusicianInfo();

  if (!(info as any).display_name) {
    return(
      <div>
        Sorry, musician not found in database!

        <Link to="/">
        <button className='border-2 border-black rounded font-bold text-fuchsia-700 mx-10 my-5 px-2 rounded-full'>
          Home
        </button>
      </Link>

      </div>
    )
  } else {

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

  */


}

export default PublicMusicianContainer;