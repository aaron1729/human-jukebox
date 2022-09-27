import React from 'react';

function SearchInput(){
  return(
    <div className="search-div">
      <form action="" method="get">
        <label htmlFor="search-param">Look up a musician: </label>
        <input type="search" name="search-param" required></input>
        <input type="submit" name="search-param" value="search"></input>
      </form>
    </div>
  )
}

export default SearchInput;