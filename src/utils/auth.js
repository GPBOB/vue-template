import store from './store'

const TokenKey = 'supervise_Token'

export function getToken() {
  return store.get(TokenKey)
}

export function setToken(token) {
  return store.set(TokenKey, token, new Date().getTime() + (24 * 60 * 60 * 1000))
}

export function removeToken() {
  return store.remove(TokenKey)
}
