import React from 'react'
import { Link } from 'react-router-dom';
import { styles } from '../styles';

const NoMusicianPage = (props: any) => {
  const handle = props.handle
  return (
    <div className="private-musician flex flex-col items-center">
      <Link to="/">
        <button className={styles.buttonSmall}>
          Home
        </button>
      </Link>
      Sorry, no musician with handle {handle} exists in the database!
    </div>
  )
}

export default NoMusicianPage;