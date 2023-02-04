import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PublicMusicianContainer from './PublicMusicianContainer';
import { styles } from '../styles';

function PublicMusicianPreviewContainer(){

  const navigate = useNavigate();

  // get query parameter from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const handle = searchParams.get('musician');
  console.log('inside of PublicMusicianPreviewContainer component, and handle (coming from query parameter) is:', handle);

    return(

      <div className="flex flex-col items-center">
        <h1 className={styles.h1Text}>preview of public page</h1>

        <button
        onClick = {() => navigate(`/musician/private?musician=${handle}`)}
        >
        <span className={styles.textButtonForDbUpdates}>return to private page</span>
      </button>

        <hr className="w-full my-10" />

        <PublicMusicianContainer />

      </div>

    )
}



export default PublicMusicianPreviewContainer;