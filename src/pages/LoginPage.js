import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { navigateTo } = useSelector(state => state.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(hasAccount) {
      dispatch(loginUser({ phoneNo, password }));
    } else {
      dispatch(registerUser({ name, email, phoneNo, password }));
    }
  }

  if(navigateTo) {
    navigate(navigateTo);
    window.location.reload();
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="https://bishopcottonboysschool.edu.in/sites/default/files/footer_logo1.png"
          alt="Your Company"
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Bishop Cotton Boys' School
        </h2>
        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!hasAccount && <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>}
          {!hasAccount && <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>}
          <div>
            <label htmlFor="tel" className="block text-sm font-medium leading-6 text-gray-900">
              Phone No
            </label>
            <div className="mt-2">
              <input
                id="phoneNo"
                name="tel"
                type="tel"
                autoComplete="tel"
                value={phoneNo}
                maxLength={10}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                {!hasAccount ? 'Create a password': 'Password'}
              </label>
             {hasAccount && <div className="text-sm">
                <p className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={() => navigate('/forgot-password')}>
                  Forgot password?
                </p>
              </div>}
            </div>
            <div className="relative mt-2">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 right-0 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                <label htmlFor="currency" className="mr-3">
                  {showPassword ? <EyeSlashIcon className='w-5 h-5' /> : <EyeIcon className='w-5 h-5' />}
                </label>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {!hasAccount ? 'Sign Up' : 'Login'}
            </button>
          </div>
          <div className="flex justify-between text-sm">
            <div className="text-sm">
              <div className="flex font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={() => navigate('/')}>
                <ArrowLeftCircleIcon className='w-5 h-5 text-primary mr-1' />
                <span>Home</span>
              </div>
            </div>
            <span className="text-center text-sm text-gray-500">
              {hasAccount ? 'Not a member yet? ': 'Already have an account? '}
              <span
                onClick={() => setHasAccount(!hasAccount)}
                className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                {hasAccount ? 'Sign-Up' : 'Login'}
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
};

export default LoginPage;
