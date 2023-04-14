import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => (
  <form onSubmit={handleLogin}>
    <h1>log in to application</h1>
    <div>
			username
      <input
        type="text"
        id='loginUsernameField'
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
			password
      <input
        type="password"
        id='loginPasswordField'
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit" id='loginButton'>login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm