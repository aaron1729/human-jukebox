import React, { useState } from 'react';
// import PublicMusicianContainer from './PublicMusicianContainer';
import SongDisplayContainer from './SongDisplayContainer';
import PlaylistDisplayContainer from './PlaylistDisplayContainer';
import { useSearchParams, Link } from 'react-router-dom';
import { useFetch } from 'react-async';

import ReactModal from 'react-modal';




// this will be used to display playlists
import Modal from '@mui/material/Modal';




import { styles } from '../styles';
import { style } from '@mui/system';


function PrivateMusicianContainer(){

  // get query parameter from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const handle = searchParams.get('musician');
  console.log('inside of PrivateMusicianContainer component, and handle (coming from query parameter) is:', handle);

  // toggle whether to show or hide the modal of playlists
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);


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
        <button className={styles.buttonSmall}>
          Home
        </button>
      </Link>

      <Link to="/">
        <button onClick={deleteCookies} className={styles.buttonSmall}>
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

      <b>above, most/all will be input fields so that the musician can edit their name, handle, venmo link, bio, etc. (not spotify id, and make handle a separate page.)</b>

      <button
        id="toggle-playlists-modal"
        onClick={() => setShowPlaylistModal(true)}
        className={styles.buttonSmall}
      >
        show playlists modal
      </button>

      <ReactModal
        isOpen={showPlaylistModal}
        parentSelector={() => document.getElementById("root") || undefined}
        // the following is not recommended in ReactModal docs, but it gives an error otherwise
        ariaHideApp={false}
        className={"ReactModal__Content bg-gradient-to-r from-green-400 to-red-500"}
        // @apply bg-gradient-to-r from-red-400 to-blue-500"
        overlayClassName={"ReactModal__Overlay"}
      >

        <h4><b>Click a playlist title to see it on Spotify!</b></h4>

        <PlaylistDisplayContainer />

        

        {/* put radio buttons on the playlists, attach them to the playlist id's, and then give the following button an onClick that grabs the playlist id and sends it to the database */}
        <button className={styles.buttonSmall}>
          apply
        </button>

        <button onClick={() => setShowPlaylistModal(false)} className={styles.buttonSmall}>
          cancel
        </button>
      </ReactModal>

      <br />



      {/* <PublicMusicianContainer /> */}

      <SongDisplayContainer handle={handle} />
    </div>
  )
}
}

export default PrivateMusicianContainer;
