import React, { useEffect, useState } from 'react';
import SongDisplayContainer from './SongDisplayContainer';
import PlaylistsDisplayContainer from './PlaylistsDisplayContainer';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import { styles } from '../styles';
import TextFieldSmall from '../Components/TextFieldSmall';
import TextFieldLarge from '../Components/TextFieldLarge';
import DeleteAccount from '../Components/DeleteAccount';

const globals = require('../../globals');

/*
// on 2/6/2023, commenting these out because they seem to be pulling with them some crappy old node packages that are messing up my backend webpack build.
// these are from: https://mui.com/material-ui/material-icons/
import SyncIcon from '@mui/icons-material/Sync';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
*/




// the PrivateMusicianContainer component is substantially more complicated that PublicMusicianContainer, because the musician can CRUD info.
// it will contain a PrivateMusicianInfo component and a SongDisplayContainer component (or perhaps even the full PublicMusicianContainer component?).
// it might seem that its own state should just be the handle, since that's all that's needed to make the SongDisplayContainer.
// however, if the musician changes their playlist, then this should update. so at least the musician's playlist should live as state here; and given that, it seems cleanest for _all_ of the private musician info to live as state here.
// then, we can use a useEffect inside of SongDisplayContainer, to re-trigger the "get all songs" function whenever the playlist is updated.

function PrivateMusicianContainer(){

  const navigate = useNavigate();

  // get query parameter from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const handle = searchParams.get('musician');

  // toggle whether to show or hide the various modals
  const [showPlaylistsModal, setShowPlaylistsModal] = useState(false);
  const [showTextFieldSmallModal, setShowTextFieldSmallModal] = useState(false);
  const [showTextFieldLargeModal, setShowTextFieldLargeModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  // determine what the TextFieldSmall modal is allowing input for
  const [targetForTextFieldModal, setTargetForTextFieldModal] = useState({
    field: '',
    fieldName: '',
    oldValue: ''
  });

  // dummy variable to force a rerender of SongDisplayContainer
  const [dummyVarForSongDisplayContainer, setDummyVarForSongDisplayContainer] = useState(0);

  // musician info (from database)
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
    venmo_show: false,
    email: ""
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


  const updatePrivateMusicianInfo = async (update: Update) => {
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
      if (update.spotify_playlist_id) {
        console.log('inside of "if update.spotify_playlist_id" block');
        syncPlaylistToDb(update.spotify_playlist_id);
      }
    } else {
      alert('sorry, attempt to update failed');
    }
  }


  // the reason for the default parameter is the following. it gets used in case the musician clicks the "update" button. however, if the musician selects a new playlist, then that triggers the updatePrivateMusicianInfo function, which in turn triggers this function. but the setPrivateMusicianInfo in the former is asynchronous, and so the value of privateMusicianInfo.spotify_playlist_id will not have changed by then.
  const syncPlaylistToDb = async (spotifyPlaylistId = privateMusicianInfo.spotify_playlist_id) => {
    
    console.log('inside of syncPlaylistToDb, and privateMusicianInfo.spotify_playlist_name is:', privateMusicianInfo.spotify_playlist_name);

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(`/api/setPlaylist/${spotifyPlaylistId}`, requestOptions);
    const results = await response.json();
    console.log('inside of syncPlaylistToDb, and results is:', results);
    setDummyVarForSongDisplayContainer(dummyVarForSongDisplayContainer + 1);
    console.log('and dummyVarForSongDisplayContainer is:', dummyVarForSongDisplayContainer);
    if (results.hardCutoffReached) {
      alert(`to prevent server/database crashes, by default Human Jukebox only allows musicians to import ${globals.hardCutoffForPlaylistLength} songs to the database. your current chosen playlist exceeds this limit. please contact us at human.jukebox.app@gmail.com if you would like this limit raised for you!`)
    }
  }


  const deleteMusician = async () => {
    console.log('inside of deleteMusician function in PrivateMusicianContainer');
    // const response = await 
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('/api/deleteMusician', requestOptions);
    // const results = await response.json();
    // console.log(results);
    navigate('/');
  }


  const deleteCookies = () => {
    fetch('/api/logout');
  }

  let baseForRedirectUri: String;
  if (process.env.NODE_ENV === "production") {
    baseForRedirectUri = globals.REDIRECT_URI_BASE_PRODUCTION
  } else {
    baseForRedirectUri = globals.REDIRECT_URI_BASE_DEVELOPMENT
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
      </span>

      <span>
        <b>handle: </b>
        {privateMusicianInfo.handle}
        <button
          onClick={() => navigate(`/musician/private/handle?musician=${privateMusicianInfo.handle}&spotifyId=${privateMusicianInfo.spotify_id}`)}
          className='ml-5'
        >
          <span className={styles.textButtonForDbUpdates}>edit</span>
        </button>
      </span>

      <span>
        <b>email: </b>
        {privateMusicianInfo.email}
        <button
          onClick={() => {
            setTargetForTextFieldModal({
              field: 'email',
              fieldName: 'email',
              oldValue: privateMusicianInfo.email
            })
            setShowTextFieldSmallModal(true)
          }}
          className='ml-5'
        >
          <span className={styles.textButtonForDbUpdates}>edit</span>
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
          className='ml-5'
        >
          <span className={styles.textButtonForDbUpdates}>edit</span>
        </button>
      </span>

      <span>
        <b>show instagram on public page: </b>
        {privateMusicianInfo.instagram_show ? 'yes' : 'no'}
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
        {privateMusicianInfo.venmo_show ? 'yes' : 'no'}
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
        {privateMusicianInfo.spotify_playlist_id &&
        <button
          onClick={() => syncPlaylistToDb()}
          className='ml-5'
        >
          <span className={styles.textButtonForDbUpdates}>
            sync
          </span>
        </button>
        }
        <button
          id="toggle-playlists-modal"
          onClick={() => setShowPlaylistsModal(true)}
          className='ml-5'
        >
        <span className={styles.textButtonForDbUpdates}>
          {privateMusicianInfo.spotify_playlist_id ? 'change' : 'choose'}
        </span>
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

      <br />

      <button
        onClick = {() => navigate(`/musician/private/preview?musician=${privateMusicianInfo.handle}`)}
        // className={'ml-5'}
      >
        <span className={styles.textButtonForDbUpdates}>preview public page</span>
      </button>
      <h6 className="text-xs my-2">
        <b>direct link:</b>
        &nbsp;
        <Link
        to={`/musician/public?musician=${handle}`}
        >
        {baseForRedirectUri}?handle={handle}
        </Link>
        &nbsp;
        <button onClick={() => navigator.clipboard.writeText(`${baseForRedirectUri}?handle=${handle}`)}>
          <span className={styles.textButtonForDbUpdates}>copy to clipboard</span>
        </button>
      </h6>

      <br />

      <button
        onClick={() => setShowDeleteAccountModal(true)}
        // className={'ml-5'}
      >
        <span className={styles.textButtonForDbUpdates}>delete account</span>
      </button>

      <hr className="w-full my-10" />

      <SongDisplayContainer handle={handle} dummyVar={dummyVarForSongDisplayContainer} />

      
   

      <br />
      <br />
      <br />




{/*     
      <Link to="/">
        <SyncIcon fontSize="small" />
        <SyncIcon fontSize="medium" />
        <SyncIcon fontSize="large" />
      </Link>
        <Tooltip title="EDIT" arrow><EditIcon /></Tooltip>
        <Button endIcon={<EditIcon />} size="small">edit</Button>
        <CheckBoxOutlinedIcon />
        <CheckBoxOutlineBlankIcon />
        <Button startIcon={<EditIcon />} size="small">edit</Button>
        <IconButton>
          <CheckBoxOutlinedIcon />
        </IconButton>
 */}






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

      <ReactModal
        isOpen={showDeleteAccountModal}
        parentSelector={() => document.getElementById("root") || undefined}
        ariaHideApp={false}
        className={"ReactModalSmall__Content" + " " + styles.altFade}
        overlayClassName={"ReactModal__Overlay"}
        contentLabel={"modal for deleting account"}
      >

        <DeleteAccount
          setShowDeleteAccountModal={setShowDeleteAccountModal}
          deleteMusician={deleteMusician}
        />

      </ReactModal>

    </div>

  )

}

export default PrivateMusicianContainer;