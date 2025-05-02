import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Mail, Lock, Briefcase } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const registrationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    businessname: Yup.string().required('Business name is required')
  });

  const { user, loading, isOffline, loginOnline, loginOffline, register, logOut } = useAuthStore();

  const {
    values,
    errors,
    validate,
    resetForm,
    handleChange
  } = useForm({ email: '', password: '', businessname: '' }, isLogin ? loginSchema : registrationSchema);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate();
    if (!isValid) return;

    try {
      if (isLogin) {
        const loginFn = isOffline ? loginOffline : loginOnline;
        const { success, message } = await loginFn(values.email, values.password);
        if (!success) return toast.error(message);
        resetForm();
        navigate('/dashboard');
        return toast.success('Successfully logged in');
      } else {
        if (!navigator.onLine) return toast.error("Registration requires internet access.");
        const { success, message } = await register(values.email, values.password, values.businessname);
        if (!success) return toast.error(message);
        navigate('/');
        return toast.success('Registered successfully');
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white dark:bg-gray-900">
      {loading && <LoadingSpinner />}

      {/* Left Side */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-brand-blue dark:bg-brand-blue/90 px-8">
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white dark:bg-gray-100 rounded-lg px-4 py-2">
              <span className="text-brand-blue text-2xl font-bold">S</span>
            </div>
            <h1 className="text-3xl font-bold text-white">StockPadi</h1>
          </div>
          <h2 className="text-4xl font-bold text-white">Welcome Back</h2>
          <p className="text-lg text-white/90">
            {isLogin 
              ? 'Sign in to manage your business inventory'
              : 'Create your account to get started'}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4 dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 px-4">
          <div className="text-center space-y-2">
            <div className="md:hidden flex justify-center items-center gap-3 mb-8">
              <div className="bg-brand-blue rounded-lg px-3 py-2">
                <span className="text-white text-2xl font-bold">S</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">StockPadi</h1>
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {isLogin
                ? 'Welcome back! Please sign in to continue'
                : 'Join us! Create an account to get started'}
            </p>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <div className="flex items-center border dark:border-gray-700 rounded-lg px-4 py-3 gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-500 outline-none"
                onChange={handleChange}
                value={values.email}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm pl-2">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex items-center border dark:border-gray-700 rounded-lg px-4 py-3 gap-3">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-500 outline-none"
                onChange={handleChange}
                value={values.password}
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm pl-2">{errors.password}</p>}
          </div>

          {/* Business Name Input */}
          {!isLogin && (
            <div className="space-y-2">
              <div className="flex items-center border dark:border-gray-700 rounded-lg px-4 py-3 gap-3">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="businessname"
                  placeholder="Business Name"
                  className="w-full bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-500 outline-none"
                  onChange={handleChange}
                  value={values.businessname}
                />
              </div>
              {errors.businessname && <p className="text-red-500 text-sm pl-2">{errors.businessname}</p>}
            </div>
          )}

          {/* Remember Me & Forgot Password */}
          {isLogin && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                Remember me
              </label>
              <button type="button" className="text-brand-blue hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-brand-blue text-white hover:bg-brand-blue/90 transition-colors"
          >
            {isLogin ? (isOffline ? 'Login Offline' : 'Login Online') : 'Create Account'}
          </button>

          {/* Toggle Link */}
          <p className="text-center text-gray-600 dark:text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
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