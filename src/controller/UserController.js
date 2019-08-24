const login = (username, password) => {
  if (username === 'zs' && password === '111') {
    return true
  }
  return false
}

module.exports = {
  login
}