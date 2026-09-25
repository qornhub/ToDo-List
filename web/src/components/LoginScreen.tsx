import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN, SIGNUP } from "../api/operations";

type AuthData = {
  login?: {
    user: {
      id: string;
      email: string;
    };
    token: string;
  };
  signup?: {
    user: {
      id: string;
      email: string;
    };
    token: string;
  };
};

type LoginScreenProps = {
  onLogin: () => void;
};
export default function LoginScreen({
  onLogin,
}: LoginScreenProps) {
  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading: loginLoading }] =
    useMutation<AuthData>(LOGIN);

  const [signup, { loading: signupLoading }] =
    useMutation<AuthData>(SIGNUP);

  const loading = loginLoading || signupLoading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      if (isSignup) {
        const { data } = await signup({
          variables: {
            email: email.trim(),
            password,
          },
        });

        if (data?.signup?.token) {
          localStorage.setItem("token", data.signup.token);
          localStorage.setItem(
            "user",
            JSON.stringify(data.signup.user)
          );

          alert("Your account has been created.");

          onLogin();
        }
      } else {
        const { data } = await login({
          variables: {
            email: email.trim(),
            password,
          },
        });

        if (data?.login?.token) {
          localStorage.setItem("token", data.login.token);
          localStorage.setItem(
            "user",
            JSON.stringify(data.login.user)
          );

          onLogin();
        }
      }
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
          ✓
        </div>

        {/* Heading */}
        <h1 className="text-center text-3xl font-bold text-gray-900">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>

        <p className="mt-2 mb-8 text-center text-sm text-gray-500">
          {isSignup
            ? "Create an account to start managing your todos"
            : "Sign in to manage your todos"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Email */}
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoCapitalize="none"
            autoComplete="email"
            className="mb-[18px] h-[50px] w-full rounded-[10px] border border-gray-300 bg-white px-3.5 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          {/* Password */}
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isSignup ? "new-password" : "current-password"}
            className="mb-[18px] h-[50px] w-full rounded-[10px] border border-gray-300 bg-white px-3.5 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 flex h-[50px] w-full items-center justify-center rounded-[10px] bg-blue-600 text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : isSignup ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>

          {/* Switch Login / Signup */}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="mt-5 w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {isSignup
              ? "Already have an account? Sign in"
              : "Don't have an account? Create one"}
          </button>
        </form>
      </div>
    </div>
  );
}