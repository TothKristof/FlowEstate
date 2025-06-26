import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { customFetch } from '../utils/fetch';
import Toast from './Toast';

interface UserCredentials {
  email: string;
  password: string;
  confPassword: string;
}

interface ToastState {
  isVisible: boolean;
  type: 'success' | 'error';
  message: string;
}

function RegistrationForm() {
  const navigate = useNavigate();
  const [isFormVisible, setFormVisible] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    type: 'success',
    message: '',
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserCredentials>();

  useEffect(() => {
    const timeout = setTimeout(() => setFormVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const onSubmit = async (data: UserCredentials) => {
    if (data.password !== data.confPassword) {
      setToast({
        isVisible: true,
        type: 'error',
        message: 'Passwords do not match!',
      });
      return;
    }
    try {
      const response = await customFetch({
        path: 'user/register',
        method: 'POST',
        body: {
          email: data.email,
          password: data.password,
        },
        jwt: null,
      });
      if (response.status === 200) {
        setToast({
          isVisible: true,
          type: 'success',
          message: 'Registration successful!',
        });
        setTimeout(() => {
          setToast((prev) => ({ ...prev, isVisible: false }));
          navigate('/login');
        }, 2000);
      } else {
        setToast({
          isVisible: true,
          type: 'error',
          message: 'Registration failed. Please try again.',
        });
        setTimeout(() => {
          setToast((prev) => ({ ...prev, isVisible: false }));
        }, 3000);
      }
    } catch (error) {
      setToast({
        isVisible: true,
        type: 'error',
        message: 'An error occurred during registration.',
      });
      console.log(error);
      setTimeout(() => {
        setToast((prev) => ({ ...prev, isVisible: false }));
      }, 3000);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col backdrop-blur-sm rounded-r-[1rem] transition-opacity duration-1000 ease-out ${
          isFormVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h1 className="text-center text-4xl font-semibold text-emerald-800">
          Registration
        </h1>
        <form className="fieldset w-xs p-4 mx-auto mt-10" onSubmit={handleSubmit(onSubmit)}>
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="input"
            placeholder="Email"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}

          <label className="label">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            className="input"
            placeholder="Password"
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}

          <label className="label">Confirm Password</label>
          <input
            type="password"
            {...register('confPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === watch('password') || 'Passwords do not match',
            })}
            className="input"
            placeholder="Confirm Password"
          />
          {errors.confPassword && <span className="text-red-500">{errors.confPassword.message}</span>}

          <button
            className="btn btn-neutral mt-4"
            type="submit"
          >
            Registration
          </button>
        </form>

        <div className="text-center">
          <span
            className="link link-primary"
            onClick={() => navigate('/login')}
          >
            Already have account?
          </span>
        </div>
      </div>
      {toast.isVisible && (
        <Toast type={toast.type} message={toast.message} />
      )}
    </>
  );
}

export default RegistrationForm;