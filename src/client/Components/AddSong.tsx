import React from 'react';
import { useCookies } from 'react-cookie';


// musician will enter a song name (to start - later we will add more fields for search query)
// will send a fetch get request to spotify api with access token and all that (which is in the cookies)
// will display the search results and let user select one
// then send a fetch post request to backend to add this track to the musician's song list

const AddSong = () => {
  const [cookies, setCookie] = useCookies();

  const [searchField, setSearchField] = React.useState({
    searchQuery: '',
  })

  const onSearchFieldChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchField({searchQuery: e.target.value})
  } 

  const searchSong = (e:React.SyntheticEvent) => {
    e.preventDefault();
    //console.log('target is: ',e.target);
    const { searchQuery } = searchField;

    //replace spaces with '%20'
    //replace apostrophe with '%27'
    const searchQueryClean = searchQuery.replace(' ', '%20').replace("'", '%27');

    const accessToken = cookies.access;

    // send fetch request
    const uri = 'https://api.spotify.com/v1/search' + `?q=${searchQueryClean}&type=track&limit=10`;

    const options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+ accessToken
      }
    }

    fetch(uri, options)
    .then(response => response.json())
    .then(data => {
      console.log('response data is: ', data.tracks.items)
      for(let track of data.tracks.items){
        console.log('track name and artist name: ', track.name, track.artists[0].name)
      }
    })
  }

  return(
    <div className='add-song'>
      <form className='my-4 rounded'>
        <label htmlFor='song-search'>Search Spotify for a song: </label>
        <input type='search' name='song-search' required className='border border-blue-700 rounded' value={searchField.searchQuery} onChange={onSearchFieldChange}></input>
        <input type='button' name='song-search' value='Search' onClick={searchSong} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow'></input>
      </form>
    </div>
  )
}

export default AddSong;