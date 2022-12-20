import React from 'react'

const PlaylistDisplay = (props: any) => {

  return (
      <a href={props.spotifyUrl} target='_blank'>{props.name}</a>
  )
}

export default PlaylistDisplay;