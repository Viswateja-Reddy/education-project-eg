export const getToken = () => {
  return localStorage.getItem('token')
}

export const getUser = () => {
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  try {
    const user = JSON.parse(userStr)
    if (!user || typeof user !== 'object' || !user.role) {
      return null
    }
    return user
  } catch {
    return null
  }
}

export const getUserRole = () => {
  const user = getUser()
  return user?.role || null
}

export const isAuthenticated = () => {
  const token = getToken()
  const user = getUser()
  return !!(token && user && user.role)
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

