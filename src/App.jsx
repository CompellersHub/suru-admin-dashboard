import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import SignInPage from './pages/Auth/SignInPage'
import 'react-toastify/dist/ReactToastify.css'
import { authAction } from './store/auth-slice'
import { useDispatch } from 'react-redux'
import RequireAuth from './components/RequireAuth'
import { ToastContainer } from 'react-toastify'
import Dashboard from './components/Dashboard/Dashboard'
import Products from './components/Dashboard/Products'
import Orders from './components/Dashboard/Orders'
import Uploads from './components/Dashboard/Uploads'
import Withdrawals from './components/Dashboard/Withdrawals'
import Logistics from './components/Dashboard/Logistics'
import LogWithdrawals from './components/Dashboard/LogWithdrawals'

function App() {
  const dispatch = useDispatch()

  const userData = JSON.parse(sessionStorage.getItem('userData'))

  if (userData) {
    dispatch(
      authAction.login({
        user: userData.data,
        userToken: userData.accessToken,
      })
    )
  }

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<SignInPage />} />
        <Route path='*' element={<Navigate to='/' />} />
        <Route
          path='/vendors'
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path='/products'
          element={
            <RequireAuth>
              <Products />
            </RequireAuth>
          }
        />
        <Route
          path='/orders'
          element={
            <RequireAuth>
              <Orders />
            </RequireAuth>
          }
        />
        <Route
          path='/upload'
          element={
            <RequireAuth>
              <Uploads />
            </RequireAuth>
          }
        />
        <Route
          path='/withdrawal'
          element={
            <RequireAuth>
              <Withdrawals />
            </RequireAuth>
          }
        />
        <Route
          path='/logistics-overview'
          element={
            <RequireAuth>
              <Logistics />
            </RequireAuth>
          }
        />
        <Route
          path='/log-withdrawal'
          element={
            <RequireAuth>
              <LogWithdrawals />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
