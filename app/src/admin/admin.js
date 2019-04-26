import React from "react"
import { Router } from "@reach/router" // comes with gatsby v2

import Layout from "../components/layout"
import NavBar from "./components/navbar"
import Profile from "./profile"
import Main from "./main"
import PrivateRoute from "./components/privateroute"
import Login from "./login"

const Admin = () => {
  return (
    <Layout>
      <NavBar />
      <Router>
        <PrivateRoute path="/admin/profile" component={Profile} />
        <PublicRoute path="/admin">
          <PrivateRoute path="/" component={Main} />
          <Login path="/login" />
        </PublicRoute>
      </Router>
    </Layout>
  )
}

const PublicRoute = props => (
  <div>{props.children}</div>
)

export default Admin
