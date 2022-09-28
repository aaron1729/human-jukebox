import React from 'react';
import SongDisplayContainer from './SongDisplayContainer';
import { useSearchParams } from 'react-router-dom'

function PublicMusicianContainer(){

  // figure out how to get query param from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const currentMusician = searchParams.get("artist");
  console.log('currentMusician is', currentMusician);

  return(
    <div className="Public-musician">
      {
        /*contains all of the musician data:
          bio, venmo, songs, tags, edit options
        */
      }
      <SongDisplayContainer currentMusician={currentMusician}/>
    </div>
  ) 
}

export default PublicMusicianContainer;