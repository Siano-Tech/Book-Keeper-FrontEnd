import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, verifyAccount } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { navigateTo, accountVerified } = useSelector(state => state.user);
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!accountVerified) {
        dispatch(verifyAccount({ email, phoneNo }));
    } else {
        if(password === confirmPassword) {
            dispatch(changePassword({ email, phoneNo, password, confirmPassword }));
        } else {
            toast.error("Passwords doesn't match");
        }
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
          Bishop Cotton Boy’s School
        </h2>
        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot your password?
        </h2>
      </div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!accountVerified && <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Enter Email address
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
          {!accountVerified && <div>
            <label htmlFor="phoneNo" className="block text-sm font-medium leading-6 text-gray-900">
              Enter Phone No
            </label>
            <div className="mt-2">
              <input
                id="phoneNo"
                name="phoneNo"
                type="tel"
                autoComplete="tel"
                maxLength={10}
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>}
          {/* <div>
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
          </div> */}
          {accountVerified && <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Enter New Password
            </label>
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
          </div>}
          {accountVerified && <div>
            <label htmlFor="confirm" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm New Password
            </label>
            <div className="relative mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="current-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 right-0 flex items-center cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                <label htmlFor="currency" className="mr-3">
                  {showConfirmPassword ? <EyeSlashIcon className='w-5 h-5' /> : <EyeIcon className='w-5 h-5' />}
                </label>
              </div>
            </div>
          </div>}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default ForgotPasswordPage;
