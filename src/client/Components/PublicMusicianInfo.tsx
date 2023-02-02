import React from 'react'

const PublicMusicianInfo = (props: any) => {

  const publicMusicianInfo = props.info;

  console.log('in PublicMusicianInfo, and info (coming from props) is:', publicMusicianInfo);

  return (
    <div className='flex flex-col items-center'>

      <h2 className='text-4xl py-2'><span className='font-bold'>name:</span> {publicMusicianInfo.display_name} </h2>

      {!!publicMusicianInfo.bio && <span className='text-2xl'><span className='font-bold'>bio:</span> {publicMusicianInfo.bio}</span>}

      <span className='flex flex-row items-center'>
      
        {!!publicMusicianInfo.venmo && <a href={'https://venmo.com/' + publicMusicianInfo.venmo} target='_blank' ><img alt='Venmo logo' width='50vh' src='https://1000logos.net/wp-content/uploads/2021/12/Venmo_Logo_PNG7.png' /></a>}

        {!!publicMusicianInfo.instagram && <a href={'https://instagram.com/' + publicMusicianInfo.instagram} target='_blank'><img alt='Instagram logo' width='50vh' src='https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png' /></a>}

      </span>

    </div>
  )

}

export default PublicMusicianInfo;