import React, {useEffect, useState} from 'react'

const PublicMusicianInfo = (props: any) => {

  const publicMusicianInfo = props.info;

  console.log('in PublicMusicianInfo, and info (coming from props) is:', PublicMusicianInfo);



/*

  // THIS USAGE OF useState WAS FROM BEFORE musicianInfo GOT PASSED AS PROPS. (at that time, i passed "handle" as props; this is used in the commented-out code below.)

  const [musicianInfo, setMusicianInfo] = useState({
    handle,
    displayName: '',
    bio: '',
    venmo: '',
    instagram: '',
  });

  // get musician's info from db
  const getMusicianInfo = async () => {
    const response = await fetch(`/api/info_public/${handle}`);
    const info = await response.json();
    console.log('info from getMusicianInfo:', info);
    setMusicianInfo({...musicianInfo, displayName: info.display_name, instagram: info.instagram, venmo: info.venmo, bio: info.bio})
  }

  useEffect(() => {
    getMusicianInfo();
  }, [])

*/




  return (
    <div className='flex flex-col items-center'>

      <h2 className='text-4xl py-2'><span className='font-bold'>name:</span> {publicMusicianInfo.display_name} </h2>

      <span className='text-2xl'><span className='font-bold'>bio:</span> {publicMusicianInfo.bio}</span>

      <span className='flex flex-row items-center'>
      
        {publicMusicianInfo.venmo && <a href={'https://venmo.com/' + publicMusicianInfo.venmo} target='_blank' ><img alt='Venmo logo' width='50vh' src='https://1000logos.net/wp-content/uploads/2021/12/Venmo_Logo_PNG7.png' /></a>}

        {publicMusicianInfo.instagram && <a href={'https://instagram.com/' + publicMusicianInfo.instagram} target='_blank'><img alt='Instagram logo' width='50vh' src='https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png' /></a>}

      </span>

    </div>
  )

}

export default PublicMusicianInfo;