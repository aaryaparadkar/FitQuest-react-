import { Link, useNavigate } from 'react-router-dom';
import Google from '../imgs/Google.png';
import Fitquest from '../imgs/Fitquest.jpeg';
import axios from 'axios';
import { useState } from 'react';

export default function Signin() {

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState(''); 
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    const credentials = {email, pwd};

    axios.post('http://localhost:5000/user/login', credentials)
    .then(response => {
      console.log(response);
      setEmail('');
      setPwd('');
      localStorage.setItem('username', response.data.username);
      navigate('/form'); 
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-24 w-auto"
            src="/public/Fitquest.jpeg"
            alt="Fitquest"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={(e)=> setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e)=> setPwd(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSignin}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm font-bold text-blacK-500">
            OR
          </p>

            <button className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4">
              <img src="./public/Google.png" alt="G" className="h-4 w-4 mx-1 my-1" /> Sign up using Google
            </button>

          <hr className="my-5 bg-blue-800 w-full h-0.5" />
        </div>
      </div>
  )
  }
