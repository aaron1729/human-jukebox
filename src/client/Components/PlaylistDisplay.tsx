import React, { useState, useEffect } from 'react'

const PlaylistDisplay = (props: any) => {

console.log('creating a PlaylistDisplay component, with props:')
console.log('name:', props.name);
console.log('spotifyUrl:', props.spotifyUrl);
console.log('id:', props.id);
console.log('playlistChoice:', props.playlistChoice);

const [checked, setChecked] = useState(props.playlistChoice === props.id)

const handleClick = () => {
  props.handleRadioChange2(props.id)
  setChecked(props.playlistChoice === props.id)
  console.log('and now checked is:', checked)
  console.log('finished handleClick function in PlaylistDisplay component')
}

  return (
    <div>
      <input
        type="radio"
        id={props.id}
        // checked={checked}
        checked={props.playlistChoice === props.id}
        value={props.id}
        // onChange={props.handleRadioChange}
        onChange={handleClick}
        name="playlist"
      />
      <label htmlFor={props.id}>
        <a href={props.spotifyUrl} target='_blank'>{props.name}</a>
      </label>
    </div>
  )
}

export default PlaylistDisplay;