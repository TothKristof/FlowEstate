import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { customFetch } from "../services/fetch";

interface UserCredentials {
    email: string;
    password: string;
    confPassword: string;
  }

  function registration(user: UserCredentials) {
    const response = customFetch({
      path: "user/registration",
      method: "POST",
      body: {
        email: user.email,
        password: user.password
      },
      jwt: null,
    });
  }

function RegistrationForm() {
    const navigate = useNavigate();
    const [isVisible, setVisible] = useState(false);
    const [userCredentials, setUserCredentials] = useState<UserCredentials>({
      email: "",
      password: "",
      confPassword: ""
    });
  
    useEffect(() => {
      const timeout = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(timeout);
    }, []);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserCredentials((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    return (
        <div
          className={`w-1/2 p-6 flex flex-col bg-white/80 backdrop-blur-sm rounded-r-[1rem] transition-opacity duration-1000 ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-center text-3xl font-semibold text-emerald-800">
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
    
            <button className="btn btn-neutral mt-4" onClick={() => registration(userCredentials)}>Registration</button>
          </fieldset>
    
          <div className="text-center">
            <span
              className=" link link-primary"
              onClick={() => navigate("/login")}
            >
              Already have account?
            </span>
          </div>
        </div>
      );
}

export default RegistrationForm