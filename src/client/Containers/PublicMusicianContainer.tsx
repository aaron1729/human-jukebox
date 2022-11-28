import React from 'react';
import SongDisplayContainer from './SongDisplayContainer';
import { useSearchParams } from 'react-router-dom';
import MusicianInfo from '../Components/MusicianInfo';


function PublicMusicianContainer(){

  // figure out how to get query param from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const currentMusician = searchParams.get('artist');
  console.log('inside of PublicMusicianContainer component, and currentMusician is:', currentMusician);

  return(
    <div className="Public-musician">
      <MusicianInfo currentMusician={currentMusician}/>
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