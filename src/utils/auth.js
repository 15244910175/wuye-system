import Cookies from 'js-cookie'

const TokenKey = 'id_token'
const name = "username"
const json = 'tree'
const id = "id"

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function setUserName (username) {
  return Cookies.set(name, username)
}
export function getUserName () {
  return Cookies.get(name)
}
export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function setJson (data) {
  return Cookies.set(json, data)
}
export function setId (data) {
  return Cookies.set(id, data)
}
export function getId() {
  return Cookies.get(id)
}
