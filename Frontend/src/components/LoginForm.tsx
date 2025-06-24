import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { customFetch } from "../utils/fetch";

interface UserCredentials {
  email: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(false);
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });

  async function login(user: UserCredentials) {
    const response = await customFetch({
      path: "user/login",
      method: "POST",
      body: user,
      jwt: localStorage.getItem("jwt"),
    });
    if (response.data.jwt) {
      localStorage.setItem("jwt", response.data.jwt);
      navigate("/main");
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("jwt", token);
      navigate("/main", { replace: true });
    }
  }, [location, navigate]);

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
      className={`bg-white/80 backdrop-blur-sm rounded-r-[1rem] transition-opacity duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1 className="text-center text-3xl font-semibold text-emerald-800">
        Login
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

        <button
          className="btn btn-neutral mt-4"
          onClick={() => login(userCredentials)}
        >
          Login
        </button>
      </fieldset>

      <div className="text-center">
        New User?{" "}
        <span
          className=" link link-primary"
          onClick={() => navigate("/registration")}
        >
          Create account
        </span>
      </div>

      <div className="divider px-8 text-gray-500">OR</div>

      <button
        className="w-60 btn gap-2 mx-30"
        onClick={() => {
          window.location.href =
            "http://localhost:8082/oauth2/authorize/google";
        }}
      >
        <img
          src="https://www.google.com/favicon.ico"
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>
    </div>
  );
}

export default LoginForm;
