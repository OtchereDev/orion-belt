import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// Login Page Component
function LoginPage({ onNavigateToSignup, onNavigateToReset }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({ email: "", password: "" });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    if (loginErrors[name]) {
      setLoginErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!loginData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(loginData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!loginData.password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login submitted:", loginData);
    }, 1500);
  };

  return (
    <div className="w-full h-screen  flex flex-col md:flex-row">
      {/* Left Side - Hidden on Mobile */}
      <div className="hidden md:flex bg-gradient-to-br from-purple-50 to-blue-50 md:w-1/2 h-full justify-center items-center p-8">
        <div className="text-center max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 opacity-10 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-purple-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </div>
          </div>
          <p className="text-purple-700 text-2xl font-bold mb-4">
            Welcome Back
          </p>
          <p className="text-purple-600 text-lg font-medium mb-2">
            Manage your finances easily
          </p>
          <p className="text-gray-600">
            Sign in to explore changes we've made.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 h-full flex justify-center items-center bg-white p-4 md:p-0 overflow-y-auto">
        <div className="w-full max-w-sm md:max-w-md">
          <div className="mb-2 md:hidden flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Log in
          </h1>
          <p className="text-gray-600 mb-8">
            Welcome back! Please enter your details.
          </p>

          <div>
            <div className="mb-6">
              <label className="block font-medium text-gray-800 mb-2 text-sm md:text-base">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleLoginChange}
                className="w-full border border-gray-300 py-2.5 md:py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
              />
              {loginErrors.email && (
                <p className="text-red-500 text-xs mt-1">{loginErrors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block font-medium text-gray-800 mb-2 text-sm md:text-base">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full border border-gray-300 py-2.5 md:py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {loginErrors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {loginErrors.password}
                </p>
              )}
            </div>

            <div className="text-right mb-6 md:mb-8">
              <button
                onClick={onNavigateToReset}
                className="font-medium text-purple-600 hover:text-purple-700 text-sm md:text-base"
              >
                Forgot Password?
              </button>
            </div>

            <button
              onClick={handleLoginSubmit}
              disabled={isLoading}
              className="w-full py-2.5 md:py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50 transition text-sm md:text-base"
            >
              {isLoading ? "Please wait..." : "Sign in"}
            </button>

            <p className="text-center mt-6 text-gray-600 text-sm md:text-base">
              Don't have an account?{" "}
              <button
                onClick={onNavigateToSignup}
                className="text-purple-600 font-semibold hover:text-purple-700"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Signup Page Component
function SignupPage({ onNavigateToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupErrors, setSignupErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
    if (signupErrors[name]) {
      setSignupErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!signupData.name) {
      errors.name = "Name is required";
    }

    if (!signupData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(signupData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!signupData.password) {
      errors.password = "Password is required";
    } else if (signupData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!signupData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (signupData.password !== signupData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setSignupErrors(errors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Signup submitted:", signupData);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen  flex flex-col md:flex-row">
      {/* Left Side - Hidden on Mobile */}
      <div className="hidden md:flex bg-gradient-to-br from-purple-50 to-blue-50 md:w-1/2 min-h-screen justify-center items-center p-8">
        <div className="text-center max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 opacity-10 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-purple-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M15 3H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-1V7h1v2zm3 0h-1V7h1v2zm3 0h-1V7h1v2zM9 13h6v2H9z" />
              </svg>
            </div>
          </div>
          <p className="text-purple-700 text-2xl font-bold mb-4">
            Create Your Account
          </p>
          <p className="text-purple-600 text-lg font-medium mb-2">
            Join thousands of users
          </p>
          <p className="text-gray-600">Start managing your finances today.</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 min-h-screen flex justify-center items-center bg-white p-4 md:p-0 overflow-y-auto">
        <div className="w-full max-w-sm md:max-w-md py-8">
          <div className="mb-2 md:hidden flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M15 3H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-1V7h1v2zm3 0h-1V7h1v2zm3 0h-1V7h1v2zM9 13h6v2H9z" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Sign up
          </h1>
          <p className="text-gray-600 mb-8">
            Create your account to get started.
          </p>

          <div>
            <div className="mb-6">
              <label className="block font-medium text-gray-800 mb-2 text-sm md:text-base">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={signupData.name}
                onChange={handleSignupChange}
                className="w-full border border-gray-300 py-2.5 md:py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
              />
              {signupErrors.name && (
                <p className="text-red-500 text-xs mt-1">{signupErrors.name}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block font-medium text-gray-800 mb-2 text-sm md:text-base">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={signupData.email}
                onChange={handleSignupChange}
                className="w-full border border-gray-300 py-2.5 md:py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
              />
              {signupErrors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {signupErrors.email}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block font-medium text-gray-800 mb-2 text-sm md:text-base">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  className="w-full border border-gray-300 py-2.5 md:py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {signupErrors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {signupErrors.password}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block font-medium text-gray-800 mb-2 text-sm md:text-base">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  className="w-full border border-gray-300 py-2.5 md:py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {signupErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {signupErrors.confirmPassword}
                </p>
              )}
            </div>

            <button
              onClick={handleSignupSubmit}
              disabled={isLoading}
              className="w-full py-2.5 md:py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50 transition text-sm md:text-base mb-4"
            >
              {isLoading ? "Please wait..." : "Create Account"}
            </button>

            <p className="text-center text-gray-600 text-sm md:text-base">
              Already have an account?{" "}
              <button
                onClick={onNavigateToLogin}
                className="text-purple-600 font-semibold hover:text-purple-700"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reset Password Page Component
function ResetPasswordPage({ onNavigateToLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [resetData, setResetData] = useState({ email: "" });
  const [resetErrors, setResetErrors] = useState({ email: "" });
  const [resetSent, setResetSent] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetData((prev) => ({ ...prev, [name]: value }));
    if (resetErrors[name]) {
      setResetErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!resetData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(resetData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (Object.keys(errors).length > 0) {
      setResetErrors(errors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResetSent(true);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen  items-center flex flex-col md:flex-row">
      {/* Left Side - Hidden on Mobile */}
      <div className="hidden md:flex bg-gradient-to-br  from-purple-50 to-blue-50 md:w-1/2 min-h-screen justify-center items-center p-8">
        <div className="text-center max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 opacity-10 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-purple-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5s-5 2.24-5 5v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
              </svg>
            </div>
          </div>
          <p className="text-purple-700 text-2xl font-bold mb-4">
            Reset Password
          </p>
          <p className="text-purple-600 text-lg font-medium mb-2">
            Forgot your password?
          </p>
          <p className="text-gray-600">
            No worries! We'll help you reset it in minutes.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 min-h-screen flex justify-center items-center bg-white p-4 md:p-0 overflow-y-auto">
        <div className="w-full max-w-sm md:max-w-md py-8">
          <div className="mb-2 md:hidden flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5s-5 2.24-5 5v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600 mb-8">
            Enter your email to receive password reset instructions.
          </p>

          {resetSent ? (
            <div className="p-4 md:p-6 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-green-800">
                    Check your email
                  </h3>
                </div>
              </div>
              <p className="text-green-700 text-sm mb-6">
                We've sent password reset instructions to{" "}
                <strong>{resetData.email}</strong>. Please check your inbox and
                follow the link to reset your password.
              </p>
              <button
                onClick={onNavigateToLogin}
                className="w-full py-2.5 md:py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition text-sm md:text-base"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <label className="block font-medium text-gray-800 mb-2 text-sm md:text-base">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={resetData.email}
                  onChange={handleResetChange}
                  className="w-full border border-gray-300 py-2.5 md:py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
                />
                {resetErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {resetErrors.email}
                  </p>
                )}
              </div>

              <button
                onClick={handleResetSubmit}
                disabled={isLoading}
                className="w-full py-2.5 md:py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50 transition text-sm md:text-base mb-4"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>

              <p className="text-center text-gray-600 text-sm md:text-base">
                Remember your password?{" "}
                <button
                  onClick={onNavigateToLogin}
                  className="text-purple-600 font-semibold hover:text-purple-700"
                >
                  Sign in
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function AuthApp() {
  const [currentPage, setCurrentPage] = useState("login");

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return (
          <LoginPage
            onNavigateToSignup={() => setCurrentPage("signup")}
            onNavigateToReset={() => setCurrentPage("reset")}
          />
        );
      case "signup":
        return <SignupPage onNavigateToLogin={() => setCurrentPage("login")} />;
      case "reset":
        return (
          <ResetPasswordPage
            onNavigateToLogin={() => setCurrentPage("login")}
          />
        );
      default:
        return (
          <LoginPage
            onNavigateToSignup={() => setCurrentPage("signup")}
            onNavigateToReset={() => setCurrentPage("reset")}
          />
        );
    }
  };

  return <div className="h-screen w-screen bg-white">{renderPage()}</div>;
}
