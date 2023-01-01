import React, { useEffect, useState } from 'react';
import SongDisplayContainer from './SongDisplayContainer';
import PlaylistDisplayContainer from './PlaylistDisplayContainer';
import { useSearchParams, Link } from 'react-router-dom';
import { useFetch } from 'react-async';
import ReactModal from 'react-modal';
import { styles } from '../styles';


// the PrivateMusicianContainer component is substantially more complicated that PublicMusicianContainer, because the musician can CRUD info.
// it will contain a PrivateMusicianInfo component and a SongDisplayContainer component (or perhaps even the full PublicMusicianContainer?).
// it might seem that its own state should just be the handle, since that's all that's needed to make the SongDisplayContainer.
// however, if the musician changes their playlist, then this should update. so at least the musician's playlist should live as state here, and given that it seems cleanest for _all_ of the private musician info to live as state here.
// then, we can use a useEffect inside of SongDisplayContainer, with the playlist id (coming down as a prop) living in its dependency array.

function PrivateMusicianContainer(){

  // get query parameter from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const handle = searchParams.get('musician');
  console.log('inside of PrivateMusicianContainer component, and handle (coming from query parameter) is:', handle);

  // toggle whether to show or hide the modal of playlists
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  // musician info (from database).
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




  // in comparison with privateMusicianInfo, this is (purposely) missing: access, handle, and spotify_id
  type UpdateObj = {
    bio?: string
    display_name?: string,
    instagram?: string,
    instagram_show?: boolean,
    spotify_playlist_id?: string,
    spotify_playlist_name?: string,
    spotify_playlist_url?: string,
    venmo?: string,
    venmo_show?: boolean
  }
  
  const updatePrivateMusicianInfo = async (update: UpdateObj) => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    }
    const response = await fetch(`/api/updateMusicianInfo/${privateMusicianInfo.spotify_id}`, requestOptions);
    const results = await response.json();
    console.log('results is:', results);
    if (results.success) {
      setPrivateMusicianInfo({...privateMusicianInfo, ...update});
    }
    // do different things based on the response (i.e. whether the updated succeeded or failed).
  }









  // IN PROGRESS (must write back-end stuff as well). this one is more complicated, so do simpler ones first.  or it might even be supplanted by the updatePrivateMusicianInfo function...

  // this is fired by a button-click inside of the modal (in the PlaylistDisplayContainer component), and saves the current value of playlistChoice to the database.
  const setPlaylist = async (playlistId: string) => {
    // this will take a new playlist id, and:
    // save it to the database (in the public.musicians table)
    // update the songs in the database to match
    // update the `info` object here.... or perhaps that needs to be refactored to use useState, too.
    console.log('setPlaylist triggered, with argument:', playlistId)
    
    const response = await fetch(`/api/setPlaylist/${playlistId}`);
    console.log('inside of setPlaylist function, the response is:', response)
    const response4real = await response.json();
    console.log('response4real is:', response4real);

  }
  
  
  

    
    const deleteCookies = () => {
      fetch('/api/logout')
    }


  return (
    <div className="flex flex-col items-center">

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
        <button onClick={() => updatePrivateMusicianInfo({instagram_show: !privateMusicianInfo.instagram_show})} className='ml-5'>
          edit
        </button>
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
        <b>repertoire (spotify playlist): </b>
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
