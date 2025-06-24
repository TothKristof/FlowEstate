import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    email: '',
    password: '',
    confPassword: '',
  });
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    type: 'success',
    message: '',
  });

  useEffect(() => {
    const timeout = setTimeout(() => setFormVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const registration = async (user: UserCredentials) => {
    if (user.password !== user.confPassword) {
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
          email: user.email,
          password: user.password,
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
      <fieldset className="fieldset w-xs p-4 mx-auto mt-10">
        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          value={userCredentials.email}
          onChange={handleChange}
          className="input"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          value={userCredentials.password}
          onChange={handleChange}
          className="input"
          placeholder="Password"
        />

        <label className="label">Confirm Password</label>
        <input
          type="password"
          name="confPassword"
          value={userCredentials.confPassword}
          onChange={handleChange}
          className="input"
          placeholder="Confirm Password"
        />

        <button
          className="btn btn-neutral mt-4"
          onClick={() => registration(userCredentials)}
        >
          Registration
        </button>
      </fieldset>

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