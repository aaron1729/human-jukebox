import React, { useState, useEffect } from 'react'

const PlaylistDisplay = (props: any) => {

console.log('creating a PlaylistDisplay component, with props:\nname:', props.name,'\nspotifyUrl:', props.spotifyUrl,'\nid:', props.id, '\nplaylistChoice:', props.playlistChoice)
console.log('name:', props.name);
console.log('spotifyUrl:', props.spotifyUrl);
console.log('id:', props.id);
console.log('playlistChoice:', props.playlistChoice);

// const [checked, setChecked] = useState(props.playlistChoice === props.id)

// const handleClick = () => {
//   props.handleRadioChange2(props.id)
//   setChecked(props.playlistChoice === props.id)
//   console.log('and now checked is:', checked)
//   console.log('finished handleClick function in PlaylistDisplay component')
// }



  return (

    <div>
    <label htmlFor={props.id}>
              <input
                type="radio"
                id={props.id}
                key={props.id}
                value={props.id}
                onChange={props.handleRadioChange}
                // supposedly, a "name" field for input elements is only needed when using HTML (not React) to group these radio buttons together. but here it seems to be needed, otherwise the radio buttons get filled in independently.
                name="playlist"
              />
               <a href={props.spotifyUrl} target='_blank'>{props.name}</a>
            </label>
            </div>



    // <div>
    //   <input
    //     type="radio"
    //     id={props.id}
    //     // checked={checked}
    //     checked={props.playlistChoice === props.id}
    //     value={props.id}
    //     // onChange={props.handleRadioChange}
    //     onChange={props.handleRadioChange}
    //     name="playlist"
    //   />
    //   <label htmlFor={props.id}>
    //     <a href={props.spotifyUrl} target='_blank'>{props.name}</a>
    //   </label>
    // </div>
  )
}

export default PlaylistDisplay;