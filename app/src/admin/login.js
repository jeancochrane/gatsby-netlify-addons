import React from "react"
import { navigate } from "gatsby"

import { handleLogin, initAuth } from "./services/auth"

class Login extends React.Component {
  handleSubmit = () => handleLogin(user => navigate(`/admin/profile`))

  componentDidMount() {
    initAuth()
  }

  render() {
    return (
      <>
        <h1>Log in</h1>
        <div data-netlify-identity-button></div>
      </>
    )
  }
}

export default Login
