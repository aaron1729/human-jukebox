import React, { useEffect, useState } from 'react';
import SongDisplayContainer from './SongDisplayContainer';
import PlaylistDisplayContainer from './PlaylistDisplayContainer';
import { useSearchParams, Link } from 'react-router-dom';
import { useFetch } from 'react-async';
import ReactModal from 'react-modal';
import { styles } from '../styles';


function PrivateMusicianContainer(){

  // get query parameter from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const handle = searchParams.get('musician');
  console.log('inside of PrivateMusicianContainer component, and handle (coming from query parameter) is:', handle);

  // toggle whether to show or hide the modal of playlists
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  // musician info (in database)
  const [privateMusicianInfo, setPrivateMusicianInfo] = useState({
    access: "",
    bio: "",
    display_name: "",
    handle: handle,
    instagram: "",
    instagram_show: false,
    spotify_id: "",
    spotify_playlist_id: "",
    spotify_playlist_name: "",
    spotify_playlist_url: "",
    venmo: "",
    venmo_show: false
  })

  const getPrivateMusicianInfo = async () => {
    const response = await fetch(`/api/info_private/${handle}`);
    const privateMusicianInfoFromDb = await response.json();
    console.log('inside of getPrivateMusicianInfo function in PrivateMusicianContainer, and privateMusicianInfoFromDb is:', privateMusicianInfoFromDb);
    setPrivateMusicianInfo(privateMusicianInfoFromDb)
  }

  useEffect(
    () => {getPrivateMusicianInfo()},
    []
  )

  /// here, put a useEffect with first argument getPlaylist (to be written)




  // this is fired by a button-click inside of the modal (in the PlaylistDisplayContainer component), and saves the current value of playlistChoice to the database.
  const setPlaylist = async (playlistId: string) => {
    // this will take a new playlist id, and:
    // save it to the database (in the public.musicians table)
    // update the songs in the database to match
    // update the `info` object here.... or perhaps that needs to be refactored to use setState, too.
    console.log('setPlaylist triggered, with argument:', playlistId)
    
    const response = await fetch(`/api/setPlaylist/${playlistId}`);
    console.log('inside of setPlaylist function, the response is:', response)
    const response4real = await response.json();
    console.log('response4real is:', response4real)

    



  }
  
  
  

    
    const deleteCookies = () => {
      fetch('/api/logout')
    }


  return (
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

      <span>
        <b>display name: </b>
        {privateMusicianInfo.display_name}
      </span>
      <span>
        <b>handle: </b>
        {privateMusicianInfo.handle}
      </span>
      <span>      
        <b>spotify id: </b>
        {privateMusicianInfo.spotify_id}
      </span>
      <span>
        <b>instagram: </b>
        {privateMusicianInfo.instagram}
      </span>
      <span>
        <b>show instagram on public page: </b>
        {privateMusicianInfo.instagram_show.toString()}
      </span>
      <span>
        <b>venmo: </b>
        {privateMusicianInfo.venmo}
      </span>
      <span>
        <b>show venmo on public page: </b>
        {privateMusicianInfo.venmo_show.toString()}
      </span>
      <span>
        <b>spotify playlist: </b>
        {privateMusicianInfo.spotify_playlist_id && <a href={privateMusicianInfo.spotify_playlist_url} target="_blank">{privateMusicianInfo.spotify_playlist_name}</a>}
      </span>
      <span>
        <b>bio: </b>
        {privateMusicianInfo.bio}
      </span>

      <br />

      <i>above, most/all will be input fields so that the musician can edit their name, handle, venmo link, bio, etc. (not spotify id though; and make handle a separate page since it changes the name of the current route.)</i>

      <button
        id="toggle-playlists-modal"
        onClick={() => setShowPlaylistModal(true)}
        className={styles.buttonSmall}
      >
        show playlists modal
      </button>

      {/* see here for more: https://reactcommunity.org/react-modal/ */}
      <ReactModal
        isOpen={showPlaylistModal}
        parentSelector={() => document.getElementById("root") || undefined}
        // the following is not recommended in ReactModal docs, but it gives an error otherwise
        ariaHideApp={false}
        className={"ReactModal__Content" + " " + styles.altFade}
        // @apply bg-gradient-to-r from-red-400 to-blue-500"
        overlayClassName={"ReactModal__Overlay"}
        contentLabel={"playlist selector modal"}
      >

        <PlaylistDisplayContainer
          setShowPlaylistModal={setShowPlaylistModal}
          setPlaylist={setPlaylist}
        />

        {/* put radio buttons on the playlists, attach them to the playlist id's, and then give the following button an onClick that grabs the playlist id and sends it to the database */}
        {/* <button className={styles.buttonSmall}>
          apply
        </button>

        <button onClick={() => setShowPlaylistModal(false)} className={styles.buttonSmall}>
          cancel
        </button> */}

      </ReactModal>

      <br />

      <SongDisplayContainer handle={handle} />

    </div>

  )

}

export default PrivateMusicianContainer;
