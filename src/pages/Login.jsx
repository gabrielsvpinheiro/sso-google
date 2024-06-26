import { useState, useEffect } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import LoggedUser from './LoggedUser';

function Login() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
    () => {
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data);
          })
          .catch((err) => console.log(err));
      }
    },
    [user]
  );

  const logOut = () => {
    setUser(null);
    setProfile(null);
  };

  return (
    <>
      <div>
        <h2>React App</h2>
        {profile ? (
          <LoggedUser profile={profile} logOut={logOut}/>
          ) : (
          <button onClick={login}>Sign in with Google 🚀 </button>
        )}
      </div>
    </>
  );
}
export default Login;