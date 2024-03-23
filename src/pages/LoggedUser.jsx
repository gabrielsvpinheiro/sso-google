import PropTypes from 'prop-types';

function LoggedUser({ profile, logOut }) {
  return (
    <div>
      <img src={profile.picture} alt="user image" />
      <h3>User Logged in</h3>
      <p>Name: {profile.name}</p>
      <p>Email Address: {profile.email}</p>
      <button onClick={logOut}>Log out</button>
    </div>
  );
}

LoggedUser.propTypes = {
  profile: PropTypes.shape({
    picture: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  logOut: PropTypes.func.isRequired
};

export default LoggedUser;