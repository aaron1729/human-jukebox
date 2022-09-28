import React from 'react';

const SpotifySignIn = () => {

  return (
    <div className="spotifyContainer">
      <a href="/api/auth" className="spotify-button"><button className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-4 mt-5 mb-10 rounded-full">Login with Spotify</button></a>
    </div>
  )
}

export default SpotifySignIn;