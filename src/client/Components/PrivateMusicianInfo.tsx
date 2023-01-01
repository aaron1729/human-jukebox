import React, {useEffect, useState} from 'react';
import ReactModal from 'react-modal';
import PlaylistDisplayContainer from '../Containers/PlaylistDisplayContainer';
import { styles } from '../styles';



const PrivateMusicianInfo = (props: any) => {


  // toggle whether to show or hide the modal of playlists
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);




  const privateMusicianInfo = props.info;

  console.log('in PrivateMusicianInfo, and private musician info (coming from props) is:', privateMusicianInfo);

  return (
    <div className='flex flex-col items-center'>

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
          setPlaylist={props.setPlaylist}
        />

        {/* TO DO: put radio buttons on the playlists, attach them to the playlist id's, and then give the following button an onClick that grabs the playlist id and sends it to the database */}
        {/* <button className={styles.buttonSmall}>
          apply
        </button>

        <button onClick={() => setShowPlaylistModal(false)} className={styles.buttonSmall}>
          cancel
        </button> */}

      </ReactModal>

    </div>
  )

}

export default PrivateMusicianInfo;