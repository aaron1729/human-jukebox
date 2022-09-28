import React, { useState } from 'react'

const SignUpPage = () => {

  // use react hooks to create state for username and password
  const [data, setData] = useState({
    username:'',
    password:'',
    venmoLink: '',
    musicianBio: ''
  })

  const { username, password, venmoLink, musicianBio } = data;

  const changeHandler = (e: any) => {
    setData({...data, [e.target.name]: [e.target.value]})
    // console.log('data is:', data);
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // console.log('venmoLInk is:', venmoLink);
    // console.log('musicianBio is:', musicianBio);

    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;
    // console.log(username, password)

    console.log('body will be', JSON.stringify({ username, password, venmoLink, musicianBio}))

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, venmoLink, musicianBio})
    }
    
    // make post request to backend using username and password
    // const response = await fetch('/api/signup', options)
  }

  return (

    <div className="loginForm">
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder='Username' value={username} onChange={changeHandler}/>
        <br />
        <input type="password" name="password" placeholder='Password' value={password} onChange={changeHandler}/> 
        <input type="text" name="venmoLink" placeholder='Venmo Link' onChange={changeHandler}/> 
        <label htmlFor="text">Enter Bio:</label>
          <br/>
        <textarea id="text" name="musicianBio" rows={12} cols={50} placeholder="Describe yourself here..." onChange={changeHandler}></textarea>
        <br />
        <input type="submit" name="submit" value="Sign Up"/>
      </form>
    </div>
  )

}

export default SignUpPage;