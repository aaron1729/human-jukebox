import React, { useState, useEffect } from 'react'

const PlaylistDisplay = (props: any) => {

console.log('creating a PlaylistDisplay component, with props:\nname:', props.name,'\nspotifyUrl:', props.spotifyUrl,'\nid:', props.id, '\nplaylistChoice:', props.playlistChoice)

  return (
    <div>
      <label htmlFor={props.id}>
        <input
          type="radio"
          id={props.id}
          key={props.id}
          value={props.id}
          onChange={props.handleRadioChange}
          // supposedly, a "name" field for input elements is only needed when using HTML (not React) to group these radio buttons together. but here it seems to be needed, otherwise each radio button's state doesn't affect the state of the others, i.e. they're not grouped. (nor was it working to set their `checked` values equal a boolean coming from props.)
          name="playlist"
          className="mx-1 mr-2"
        />
        <a href={props.spotifyUrl} target='_blank'>{props.name}</a>
      </label>
    </div>
  )
}

export default PlaylistDisplay;