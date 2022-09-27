import React, { useState } from 'react';
import SpotifySignIn from './SpotifySignIn';

const LoginForm = () => {

  // use react hooks to create state for username and password
  const [data, setData] = useState({
    username:'',
    password:''
  })

  const { username, password } = data;

  const changeHandler = (e: any) => {
    setData({...data, [e.target.name]: [e.target.value]})
    console.log('data is:', data);
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    console.log(target);

    const username = target.username.value;
    const password = target.password.value;
    // const bio = target.bio.value;
    console.log(username, password)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password})
    }
    
    // make post request to backend using username and password
    // const response = await fetch('/api/login', options)
  }

  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <h1>Login here!</h1>

      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder='Username' value={username} onChange={changeHandler}/>
          <br />
          <input type="password" name="password" placeholder='Password' value={password} onChange={changeHandler}/> 
          <br />
          <input type="submit" name="submit" value="Log In"/>
        </form>
        <a href="/signup"><button>Sign Up</button></a>
      </div>


      <div> 
        <SpotifySignIn />
      </div>

    </div>
  )
}

export default LoginForm;