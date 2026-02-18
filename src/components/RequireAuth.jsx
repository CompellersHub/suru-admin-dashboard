/* eslint-disable react/prop-types */
import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LayoutDashboard from './Dashboard/LayoutDashboard'

const RequireAuth = ({ children }) => {
  const userToken = useSelector((state) => state.auth.userToken)
  const location = useLocation()

  if (!userToken) {
    console.log('No user token, redirecting to login.')
    return <Navigate to='/' state={{ from: location.pathname }} />
  }

  return <LayoutDashboard>{children}</LayoutDashboard>
}

export default RequireAuth
