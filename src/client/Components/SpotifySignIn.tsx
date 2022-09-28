import React from 'react';

const SpotifySignIn = () => {

  return (
    <div className="spotifyContainer">
      <a href="/api/auth" className="spotify-button"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Login with Spotify</button></a>
    </div>
  )
}

export default SpotifySignIn;