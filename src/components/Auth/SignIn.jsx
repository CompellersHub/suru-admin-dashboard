import { Fragment, useState, useEffect } from 'react'
import { BiHide } from 'react-icons/bi'
import { FaRegEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import suru from '../../assets/suru.png'
import logo from '../../assets/logo.png'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { authAction } from '../../store/auth-slice'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLoginUser } from '../../hooks/auth'

const SignIn = () => {
  const [viewPassword, setViewPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state) => state.auth.userToken)
  const { mutateAsync: handleLogin, isPending } = useLoginUser()

  const redirectPath = location.state?.path || '/vendors'

  useEffect(() => {
    if (user) {
      navigate(redirectPath, { replace: true })
    }
  }, [user, redirectPath, navigate])

  const setVeiw = () => {
    setViewPassword(true)
  }
  const setHide = () => {
    setViewPassword(false)
  }

  const signUpHandler = async (event) => {
    event.preventDefault()

    try {
      const response = await handleLogin({
        email: email,
        password: password,
      })
      if (response?.status) {
        const data = response?.data

        toast.success('Login successfully')
        dispatch(
          authAction.login({
            user: data.data,
            userToken: data.accessToken,
          })
        )
        sessionStorage.setItem('userData', JSON.stringify(data))
        sessionStorage.setItem('userToken', data?.accessToken)
      }

      setTimeout(() => {
        navigate(redirectPath, { replace: true })
      }, 1000)
    } catch (err) {
      toast.error(`${err?.response?.data?.message}`)
    }
  }

  return (
    <Fragment>
      <header className='flex items-center justify-between gap-5 bg-navbar-color p-4 md:px-10'>
        <Link to='/' className='flex gap-3 items-center'>
          <img src={logo} alt='logo' className='w-10 md:w-14' />
          <img src={suru} alt='company name' className='w-14 md:w-24 lg:w-32' />
        </Link>
      </header>

      <section className='flex flex-col gap-10 items-center justify-center min-h-[100vh] py-10 px-5 font-sans'>
        <div className='flex flex-col gap-3 text-center'>
          <h2 className='text-2xl md:text-4xl font-bold text-navbar-color'>
            Sign in to Suru
          </h2>
          <p className='text-gray-500 font-semibold'>
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* form */}
        <form
          onSubmit={signUpHandler}
          className='flex flex-col gap-5 w-full md:w-[70%] lg:w-[40%]'
        >
          <div className='flex flex-col gap-12'>
            <input
              className='p-4 border-2 rounded-lg'
              type='email'
              placeholder='Email address'
              onChange={(event) => setEmail(event.target.value)}
            />
            <div className='flex relative'>
              <input
                className='p-4 w-full border-2 rounded-md'
                type={viewPassword ? ' text' : 'password'}
                placeholder='Password'
                onChange={(event) => setPassword(event.target.value)}
              />
              {!viewPassword && (
                <button
                  onClick={setVeiw}
                  type='button'
                  className='absolute text-xl text-gray-600 right-5 top-[50%] -translate-y-[50%]'
                >
                  <BiHide />
                </button>
              )}
              {viewPassword && (
                <button
                  onClick={setHide}
                  type='button'
                  className='absolute text-xl text-gray-600 right-5 top-[50%] -translate-y-[50%]'
                >
                  <FaRegEye />
                </button>
              )}
            </div>
          </div>
          {/* submit button */}
          <button className='bg-navbar-color p-4 rounded-full text-white font-semibold transition-all duration-200 border-navbar-color border hover:text-navbar-color hover:bg-white'>
            {isPending ? 'Loading...' : 'Login'}
          </button>
        </form>
      </section>
    </Fragment>
  )
}

export default SignIn
