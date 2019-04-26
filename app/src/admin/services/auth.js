import netlifyIdentity from "netlify-identity-widget"

export const isBrowser = () => typeof window !== "undefined"

export const initAuth = () => {
  if (isBrowser()) {
    netlifyIdentity.init()
    window.netlifyIdentity = netlifyIdentity
  }
}

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("netlifyUser")
    ? JSON.parse(window.localStorage.getItem("netlifyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("netlifyUser", JSON.stringify(user))

export const handleLogin = callback => {
  if (isLoggedIn()) {
    callback(getUser())
  } else {
    netlifyIdentity.open()
    netlifyIdentity.on("login", user => {
      setUser(user)
      callback(user)
    })
  }
}

export const isLoggedIn = () => {
  if (!isBrowser()) return false
  const user = netlifyIdentity.currentUser()
  return !!user
}

export const logout = callback => {
  netlifyIdentity.logout()
  netlifyIdentity.on("logout", () => {
    setUser({})
    callback()
  })
}
