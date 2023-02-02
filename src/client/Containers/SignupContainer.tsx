import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import TextFieldSmall from '../Components/TextFieldSmall';
import TextFieldLarge from '../Components/TextFieldLarge';
import PlaylistsDisplayContainer from './PlaylistsDisplayContainer';
import { styles } from '../styles';

function SignupContainer(){

  const navigate = useNavigate();

  // get spotifyId from cookies
  const cookieArr = document.cookie.split(";").map(kvpString => kvpString.trim());
  console.log('inside of SignupContainer component, and cookie (coming from cookies) is:', cookieArr);
  let spotifyId: String;
  cookieArr.forEach(kvpString => {
    if (kvpString.slice(0,10) === "spotifyId=") spotifyId = kvpString.slice(10,);
  });
  console.log('inside of SignupContainer component, and spotifyId (coming from cookies) is:', spotifyId);

  // save the handle so that we can later navigate to the correct private page.
  const [handle, setHandle] = useState("");

  // this is an array that determines the ordering of the modals.
  // note: handle should _not_ be last, otherwise the navigate might happen before the handle is set (since its setter is asynchronous). similarly, when the playlist was last, then the musician private page loaded _before_ the playlist was saved to the database! but it seems that having instagram or venmo last is alright.
  type ModalTypeForSignup = SmallTextField | LargeTextField | "" | "playlist";
  const modalOrder: Array<ModalTypeForSignup> = [
    "display_name",
    "handle",
    "playlist",
    "bio",
    "instagram",
    "venmo",
    "email",
  ];

  // the variable "modal" says which modal is open, if any.
  // there's an awkwardness in design...
    // the modal components were written to trigger their own "close the modal" functions.
    // but they don't contain the "update the info in the database" functions; that lives in the PrivateMusicianContainer component.
    // this is no problem unless there's a chance that the update fails, which is the case with the handle.
    // the handle is never changed in the PrivateMusicianContainer: there's a whole separate component and route for that (HandleChooserContainer and musician/private/signup/, respectively).
    // but of course, the handle _is_ changed here (among other things).
    // so, in the TextFieldSmall component we _don't_ 
  
  const [modalNum, setModalNum] = useState<number>(-1);
  
  const [modal, setModal] = useState<ModalTypeForSignup>("");
  // the following function is passed as props to the various components inside of the modals. the argument is a boolean, which should be false when the modal is supposed to be closed (and, here, replaced with a new one.)
  const nextModal = (bool: Boolean) => {
    if (!bool) {
      console.log('inside of nextModal function, and modalNum is:', modalNum);
      setModalNum(modalNum + 1);
    }
  }

  useEffect(
    () => {
      if (modalNum === modalOrder.length) {
        navigate(`/musician/private?musician=${handle}`);
      } else {
        setModal(modalOrder[modalNum])}
      },
    [modalNum]
  )




  // this is modeled on the updatePrivateMusicianInfo function from the PrivateMusicianContainer component. (see also the similar function in HandleChooserContainer.)
  const updatePrivateMusicianInfo = async (update: Update) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    }
    const response = await fetch(`/api/updateMusicianInfo/${spotifyId}`, requestOptions);
    const results = await response.json();
    console.log('results is:', results);
    if (results.success) {

      console.log('success in updatePrivateMusicianInfo function, and the update object is:', update);

      if (update.handle) {
        console.log('inside of if update.handle block');
        // really this function just says "go to the next modal", but the argument is funky -- see above.
        nextModal(false);
        setHandle(update.handle);
      }

      console.log('inside of updatePrivateMusicianInfo in SignupContainer, and the handle is now:', handle);

      if (update.spotify_playlist_id) {
        syncPlaylistToDb(update.spotify_playlist_id);
      }

      return;
    } else {
      // this should only be triggered in the case that the modal is the handle. for all other fields, all attempts should succeed.
      alert('sorry, that handle is taken! please try another.');
      return;
    }
  }

  
  // this is based on the same-named function from PrivateMusicianContainer.
  const syncPlaylistToDb = async (spotifyPlaylistId: String) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(`/api/setPlaylist/${spotifyPlaylistId}`, requestOptions);
    const results = await response.json();
    console.log('inside of syncPlaylistToDb, and results is:', results);
  }








    return(

      <div className="flex flex-col items-center">
        
        <h1 className ="fl text-3xl font-bold text-fuchsia-700 mx-5 my-10">
          Welcome to the Human Jukebox signup page!
        </h1>

        <button onClick={() => setModalNum(0)} className={styles.buttonSmall}>
          let's get started!
        </button>




        <ReactModal
          isOpen={modal === "handle"}
          parentSelector={() => document.getElementById("root") || undefined}
          ariaHideApp={false}
          className={"ReactModalSmall__Content" + " " + styles.altFade}
          overlayClassName={"ReactModal__Overlay"}
          contentLabel={"selector modal for handle"}
        >

          <TextFieldSmall
            field={'handle'}
            fieldName={'handle'}
            oldValue={''}
            updatePrivateMusicianInfo={updatePrivateMusicianInfo}
            setShowTextFieldSmallModal={nextModal}
            signup={true}
          />

        </ReactModal>

        <ReactModal
          isOpen={modal === "display_name"}
          parentSelector={() => document.getElementById("root") || undefined}
          ariaHideApp={false}
          className={"ReactModalSmall__Content" + " " + styles.altFade}
          overlayClassName={"ReactModal__Overlay"}
          contentLabel={"selector modal for display name"}
        >

          <TextFieldSmall
            field={'display_name'}
            fieldName={'display name'}
            oldValue={''}
            updatePrivateMusicianInfo={updatePrivateMusicianInfo}
            setShowTextFieldSmallModal={nextModal}
            signup={true}
          />

        </ReactModal>

        <ReactModal
          isOpen={modal === "bio"}
          parentSelector={() => document.getElementById("root") || undefined}
          ariaHideApp={false}
          className={"ReactModal__Content" + " " + styles.altFade}
          overlayClassName={"ReactModal__Overlay"}
          contentLabel={"selector modal for biography"}
        >

          <TextFieldLarge
            field={'bio'}
            fieldName={'bio'}
            oldValue={''}
            updatePrivateMusicianInfo={updatePrivateMusicianInfo}
            setShowTextFieldLargeModal={nextModal}
            signup={true}
          />

        </ReactModal>

        <ReactModal
          isOpen={modal === "instagram"}
          parentSelector={() => document.getElementById("root") || undefined}
          ariaHideApp={false}
          className={"ReactModalSmall__Content" + " " + styles.altFade}
          overlayClassName={"ReactModal__Overlay"}
          contentLabel={"selector modal for instagram"}
        >
          
          <TextFieldSmall
            field={'instagram'}
            fieldName={'instagram'}
            oldValue={''}
            updatePrivateMusicianInfo={updatePrivateMusicianInfo}
            setShowTextFieldSmallModal={nextModal}
            signup={true}
          />

        </ReactModal>

        <ReactModal
          isOpen={modal === "venmo"}
          parentSelector={() => document.getElementById("root") || undefined}
          ariaHideApp={false}
          className={"ReactModalSmall__Content" + " " + styles.altFade}
          overlayClassName={"ReactModal__Overlay"}
          contentLabel={"selector modal for venmo"}
        >
          
          <TextFieldSmall
            field={'venmo'}
            fieldName={'venmo'}
            oldValue={''}
            updatePrivateMusicianInfo={updatePrivateMusicianInfo}
            setShowTextFieldSmallModal={nextModal}
            signup={true}
          />

        </ReactModal>

        <ReactModal
          isOpen={modal === "email"}
          parentSelector={() => document.getElementById("root") || undefined}
          ariaHideApp={false}
          className={"ReactModalSmall__Content" + " " + styles.altFade}
          overlayClassName={"ReactModal__Overlay"}
          contentLabel={"selector modal for email"}
        >
          
          <TextFieldSmall
            field={'email'}
            fieldName={'email'}
            oldValue={''}
            updatePrivateMusicianInfo={updatePrivateMusicianInfo}
            setShowTextFieldSmallModal={nextModal}
            signup={true}
          />

        </ReactModal>

        <ReactModal
        isOpen={modal === "playlist"}
        parentSelector={() => document.getElementById("root") || undefined}
        ariaHideApp={false}
        className={"ReactModal__Content" + " " + styles.altFade}
        overlayClassName={"ReactModal__Overlay"}
        contentLabel={"playlist selector modal"}
      >

        <PlaylistsDisplayContainer
          spotifyPlaylistId={""}
          updatePrivateMusicianInfo={updatePrivateMusicianInfo}
          setShowPlaylistsModal={nextModal}
          signup={true}
        />

      </ReactModal>




        
    
      </div>

    )
}

export default SignupContainer;