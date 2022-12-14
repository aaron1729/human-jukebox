import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom'
import { styles } from '../styles'

function SearchInput(){

  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      handle: { value: string };
    };

    const handle = target.handle.value;
    console.log('the handle (inside of the SearchInput component) is:', handle)
    // navigate to public musician profile
    navigate(`/musician/public?musician=${handle}`)
    // navigate({
    //   pathname: '/musician/public',
    //   search: createSearchParams({
    //     musician: handle
    //   }).toString()
    // })
  }


  return(
    <div className="search-div">
      <form onSubmit={handleSubmit} className='my-4 rounded font-semibold'>
        <label htmlFor="handle">find musician by handle: </label>
        <input type="search" name="handle" required className={styles.searchField}></input>
        <input type="submit" name="search-param" value="Search"
        className={styles.buttonSmall}
        ></input>
      </form>
    </div>
  )
}

export default SearchInput;