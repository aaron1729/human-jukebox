import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import TextFieldSmall from '../Components/TextFieldSmall';
import { styles } from '../styles';

function HandleChooserContainer(){

  // get query parameter from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const oldHandle = searchParams.get('musician');
  const spotifyId = searchParams.get('spotifyId');
  console.log('inside of PublicMusicianContainer component, and oldHandle (coming from query parameter) is:', oldHandle);
  console.log('inside of PublicMusicianContainer component, and spotifyId (coming from query parameter) is:', spotifyId);


  const navigate = useNavigate();

  // this is modeled on the updatePrivateMusicianInfo function from the PrivateMusicianContainer component.
  const updateHandle = async (update: Update) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    }
    const response = await fetch(`/api/updateMusicianInfo/${spotifyId}`, requestOptions);
    const results = await response.json();
    console.log('results is:', results);
    if (results.success) {
      console.log('success in updateHandle function');
      navigate(`/musician/private?musician=${update.handle}`)
      return;
    } else {
      alert('sorry, that handle is taken! please try another.');
      return;
    }
  }



    return(

      <div className="flex flex-col items-center">
        
        &nbsp; {/* this is so that the background color gradient appears behind the modal; otherwise, it's just plain white. */}
        
        <ReactModal
          isOpen={true}
          parentSelector={() => document.getElementById("root") || undefined}
          ariaHideApp={false}
          className={"ReactModalSmall__Content" + " " + styles.altFade}
          overlayClassName={"ReactModal__Overlay"}
          contentLabel={"selector modal for handle"}
        >

          <TextFieldSmall
            field={'handle'}
            fieldName={'handle'}
            oldValue={oldHandle}
            updatePrivateMusicianInfo={updateHandle}
          />

        </ReactModal>



        
    
      </div>

    )
}



export default HandleChooserContainer;