import React, { useState } from 'react';
import { Link } from 'react-router'
import { useForm } from '../hooks/useForm';
import * as Yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png'
import LoadingSpinner from '../components/LoadingSpinner';


const LoginPage = () => {

 const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    businessname:  Yup.string().required('Business name is required')
  });

  const {
    isOffline,
    loading,
    loginOffline,
    loginOnline,
    register
  } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const {
    values,
    errors,
    validate,
    resetForm,
    handleChange
  } = useForm({email:'', password:'', businessname:''}, validationSchema)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isValid = await validate();
    if (!isValid) return;
  
    try {
      if (isLogin) {
        const loginFn = navigator.onLine ? loginOnline : loginOffline;
        const { success, message } = await loginFn(values.email, values.password);
  
        if (!success) {
            return  toast.error(message);
        }
        resetForm();
        return toast.success('Successfully loggedIn');
      } else {
        const registerFn = navigator.onLine && register
        const 
        {
        success, 
        message
        } = await registerFn(values.email, values.password, values.businessname);
        if(!success) return toast.error("Something went wrong. Please try again.");
        return toast.success('Registered Successfully');
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };
  

  return (
<div className="flex h-screen w-full bg-white">
{loading && <LoadingSpinner />}
      {/* Left Side */}
<div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-brand-blue text-white px-8">
  <div className="relative z-10 flex flex-col justify-center items-center text-center">
    <img
      src={logo}
      alt="StockPadi Logo"
      className="w-28 mb-6"
    />
    <h2 className="text-4xl font-bold mb-4">Welcome to StockPadi</h2>
    <p className="text-lg opacity-90">
      Smart inventory for growing businesses. Stay stocked. Stay smart.
    </p>
  </div>
</div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4">
        <img
        src={logo}
        alt="StockPadi Logo"
        className="w-40 mb-10 md:hidden"
        />
        <form onSubmit={handleSubmit} className="md:w-96 w-80 flex flex-col items-center">
          <h2 className="text-4xl text-gray-900 font-semibold">
            {isLogin ? 'Sign in' : 'Create account'}
          </h2>
          <p className="text-sm text-gray-500/90 mt-3">
            {isLogin
              ? 'Welcome back! Please sign in to continue'
              : 'Join us! Create an account to get started'}
          </p>


          {/* Email Input */}
          <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
            </svg>
            <input
              type="email"
              placeholder="Email"
              name='email'
              className="bg-transparent text-sm text-gray-500/80
               placeholder-gray-500/80 outline-none w-full h-full"
               onChange={handleChange}
               value={values.email || ''}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
            </svg>
            <input
              type="password"
              name='password'
              placeholder="Password"
              className="bg-transparent text-sm text-gray-500/80 placeholder-gray-500/80 outline-none w-full h-full"
              required
              onChange={handleChange}
              value={values.password || ''}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Extra field for register */}
          <div className={`w-full mt-6 ${isLogin ? 'hidden' : ''}`}>
            <input
                type="text"
                name='businessname'
                placeholder="Business name"
                className="input input-bordered w-full rounded-full"
                onChange={handleChange}
                value={values.businessname || ''}
                required={!isLogin}
            />
            {!isLogin && errors.businessname && (
                <p className="text-red-500 text-sm">{errors.businessname}</p>
            )}
            </div>

          {/* Login Options */}
          {isLogin && (
            <div className="w-full flex items-center justify-between mt-6 text-gray-500/80">
              <div className="flex items-center gap-2">
                <input className="h-5" type="checkbox" id="remember" />
                <label className="text-sm" htmlFor="remember">Remember me</label>
              </div>
              <a href='#' className="text-sm underline">Forgot password?</a>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-brand-blue hover:opacity-90 transition-opacity"
          >
            {isLogin ? (isOffline ? 'Login Online' : 'Login Offline') : 'Register'}
          </button>

          {/* Toggle Link */}
          <p className="text-gray-500/90 text-sm mt-4">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{' '}
            <button
              type="button"
              className="text-brand-blue hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
