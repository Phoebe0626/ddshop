export const setLocalStore = function (key, value) {
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

export const getLocalStore = function (key) {
  return JSON.parse(localStorage.getItem(key))
}

export const removeLocalStore = function (key) {
  localStorage.removeItem(key)
}
