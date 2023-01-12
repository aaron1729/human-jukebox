import React, { useEffect, useState } from 'react';
import SongDisplayContainer from './SongDisplayContainer';
// import PublicMusicianInfo from '../Components/PublicMusicianInfo';
import PlaylistsDisplayContainer from './PlaylistsDisplayContainer';
import { useSearchParams, Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import { styles } from '../styles';
import TextFieldSmall from '../Components/TextFieldSmall';
import TextFieldLarge from '../Components/TextFieldLarge';

// these are from: https://mui.com/material-ui/material-icons/
import SyncIcon from '@mui/icons-material/Sync';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


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

  // toggle whether to show or hide the various modals
  const [showPlaylistsModal, setShowPlaylistsModal] = useState(false);
  const [showTextFieldSmallModal, setShowTextFieldSmallModal] = useState(false);
  const [showTextFieldLargeModal, setShowTextFieldLargeModal] = useState(false);

  // determine what the TextFieldSmall modal is allowing input for
  const [targetForTextFieldModal, setTargetForTextFieldModal] = useState({
    field: '',
    fieldName: '',
    oldValue: ''
  });

  // musician info (from database).
  const [privateMusicianInfo, setPrivateMusicianInfo] = useState({
    access: "",
    bio: "",
    display_name: "",
    handle: handle,
    instagram: "",
    instagram_show: false,
    spotify_id: "",
    spotify_playlist_id: null,
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

  
  const updatePrivateMusicianInfo = async (update: UpdateObj) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    }
    const response = await fetch(`/api/updateMusicianInfo/${privateMusicianInfo.spotify_id}`, requestOptions);
    const results = await response.json();
    console.log('results is:', results);
    if (results.success) {
      setPrivateMusicianInfo({...privateMusicianInfo, ...update});
    } else {
      alert('sorry, attempt to update failed');
    }
  }

    
    const deleteCookies = () => {
      fetch('/api/logout')
    }


  return (
    <div className="flex flex-col items-center px-10">

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

      <Link to="/">
        <SyncIcon fontSize="small" />
        <SyncIcon fontSize="medium" />
        <SyncIcon fontSize="large" />
      </Link>
      <Tooltip title="edit" arrow><EditIcon /></Tooltip>
      <CheckBoxOutlinedIcon />
      <CheckBoxOutlineBlankIcon />
      <Button startIcon={<EditIcon />} size="small">edit</Button>
      <IconButton>
        <CheckBoxOutlinedIcon />
      </IconButton>

      <span className="text-gray-500">
        <b>spotify id: </b>
        {privateMusicianInfo.spotify_id}
      </span>

      <span>
        <b>display name: </b>
        {privateMusicianInfo.display_name}
        <button
          onClick={() => {
            setTargetForTextFieldModal({
              field: 'display_name',
              fieldName: 'display name',
              oldValue: privateMusicianInfo.display_name
            })
            setShowTextFieldSmallModal(true)
          }}
          className='ml-5'
        >
          <span className={styles.textButtonForDbUpdates}>edit</span>
        </button>
        <Button endIcon={<EditIcon />} size="small">edit</Button>
      </span>

      <span>
        <b>handle: </b>
        {privateMusicianInfo.handle}
        <button
          className='ml-5'
        >
          <span className="text-red-600">edit</span>
        </button>
      </span>

      <span>
        <b>instagram: </b>
        {privateMusicianInfo.instagram &&
        <a href={'https://instagram.com/' + privateMusicianInfo.instagram} target='_blank'>
          {privateMusicianInfo.instagram}
        </a>
        }
        <button
          onClick={() => {
            setTargetForTextFieldModal({
              field: 'instagram',
              fieldName: 'Instagram handle',
              oldValue: privateMusicianInfo.instagram
            })
            setShowTextFieldSmallModal(true)
          }}
          className={'ml-5'}
        >
          <span className={styles.textButtonForDbUpdates}>edit</span>
        </button>
      </span>

      <span>
        <b>show instagram on public page: </b>
        {privateMusicianInfo.instagram_show.toString()}
        <button
          onClick={() => updatePrivateMusicianInfo({instagram_show: !privateMusicianInfo.instagram_show})}
          className='ml-5'
        >
          <span className={styles.textButtonForDbUpdates}>toggle</span>
        </button>
      </span>

      <span>
        <b>venmo: </b>
        {privateMusicianInfo.venmo &&
        <a href={'https://venmo.com/' + privateMusicianInfo.venmo} target='_blank' >
          {privateMusicianInfo.venmo}
        </a>
        }
        <button
          onClick={() => {
            setTargetForTextFieldModal({
              field: 'venmo',
              fieldName: 'Venmo handle',
              oldValue: privateMusicianInfo.venmo
            })
            setShowTextFieldSmallModal(true)
          }}
          className='ml-5'
        >
          <span className={styles.textButtonForDbUpdates}>edit</span>
        </button>
      </span>

      <span>
        <b>show venmo on public page: </b>
        {privateMusicianInfo.venmo_show.toString()}
        <button
          onClick={() => updatePrivateMusicianInfo({venmo_show: !privateMusicianInfo.venmo_show})}
          className='ml-5'
        >
          <span className={styles.textButtonForDbUpdates}>toggle</span>
        </button>
      </span>

      <span>
        <b>repertoire (a Spotify playlist): </b>
        {privateMusicianInfo.spotify_playlist_id && <a href={privateMusicianInfo.spotify_playlist_url} target="_blank">{privateMusicianInfo.spotify_playlist_name}</a>}
        <button
          className='ml-5'
        >
          <span className="text-red-600">sync</span>
        </button>
        <button
          id="toggle-playlists-modal"
          onClick={() => setShowPlaylistsModal(true)}
          className='ml-5'
        >
        <span className={styles.textButtonForDbUpdates}>edit</span>
        </button>
      </span>

      <span>
        <b>bio: </b>
        {privateMusicianInfo.bio}
        <button
          onClick={() => {
            setTargetForTextFieldModal({
              field: 'bio',
              fieldName: 'bio',
              oldValue: privateMusicianInfo.bio
            })
            setShowTextFieldLargeModal(true)
          }}
          className={'ml-5'}
        >
          <span className={styles.textButtonForDbUpdates}>edit</span>
        </button>
      </span>

      <hr className="w-full my-10" />

      <SongDisplayContainer handle={handle} />

      
   




      {/* only put comments on this instance of ReactModal.
      see here for more: https://reactcommunity.org/react-modal/ */}
      <ReactModal
        isOpen={showPlaylistsModal}
        parentSelector={() => document.getElementById("root") || undefined}
        // the following is not recommended in ReactModal docs, but it gives an error otherwise
        ariaHideApp={false}
        className={"ReactModal__Content" + " " + styles.altFade}
        overlayClassName={"ReactModal__Overlay"}
        contentLabel={"playlist selector modal"}
      >

        <PlaylistsDisplayContainer
          setShowPlaylistsModal={setShowPlaylistsModal}
          updatePrivateMusicianInfo={updatePrivateMusicianInfo}
          spotifyPlaylistId={privateMusicianInfo.spotify_playlist_id}
        />

      </ReactModal>

      <ReactModal
        isOpen={showTextFieldSmallModal}
        parentSelector={() => document.getElementById("root") || undefined}
        ariaHideApp={false}
        className={"ReactModalSmall__Content" + " " + styles.altFade}
        overlayClassName={"ReactModal__Overlay"}
        contentLabel={"selector modal for various short strings"}
      >

        <TextFieldSmall
          field={targetForTextFieldModal.field} 
          fieldName={targetForTextFieldModal.fieldName}
          oldValue={targetForTextFieldModal.oldValue}
          setShowTextFieldSmallModal={setShowTextFieldSmallModal}
          updatePrivateMusicianInfo={updatePrivateMusicianInfo}
        />

      </ReactModal>

      <ReactModal
        isOpen={showTextFieldLargeModal}
        parentSelector={() => document.getElementById("root") || undefined}
        ariaHideApp={false}
        className={"ReactModal__Content" + " " + styles.altFade}
        overlayClassName={"ReactModal__Overlay"}
        contentLabel={"selector modal for biography"}
      >

        <TextFieldLarge
          field={targetForTextFieldModal.field} 
          fieldName={targetForTextFieldModal.fieldName}
          oldValue={targetForTextFieldModal.oldValue}
          setShowTextFieldLargeModal={setShowTextFieldLargeModal}
          updatePrivateMusicianInfo={updatePrivateMusicianInfo}
        />

      </ReactModal>

    </div>

  )

}

export default PrivateMusicianContainer;