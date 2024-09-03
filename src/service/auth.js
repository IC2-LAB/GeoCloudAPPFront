import Cookies from 'js-cookie'

const TokenKey = 'access_token'
const userName = 'user-name'
const userRoles = 'user-roles'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  Cookies.remove(TokenKey)
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function setName (name) {
  return Cookies.set(userName, name)
}

export function getName () {
  return Cookies.get(userName)
}

export function setRoles (role) {
  return Cookies.set(userRoles, role)
}

export function getRoles () {
  return Cookies.get(userRoles)
}
