import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SignUpForm from "./SignUpForm";

export default function LoginForm() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleSignUpForms = () => {
    setShowSignUp(!showSignUp);
  };

  const handleLogin = async () => {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "http://localhost:3000",
    });
  };

  return (
    <div>
      {showSignUp ? (
        <SignUpForm toggleForms={toggleSignUpForms} />
      ) : (
        <div>
          <div className="flex text-2xl justify-center mb-4 font-bold">
            Log in
          </div>

          <div className="flex flex-col mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
              placeholder="Email"
            />
          </div>

          <div className="flex flex-col mb-2 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          <div className="flex text-xs justify-center mb-1">
            <button
              // onClick=
              className="text-blue-500 ml-1"
            >
              Forgot password?
            </button>
          </div>

          <div
            onClick={handleLogin}
            className="flex mb-2 justify-center items-center gap-3 border bg-gray-900 hover:border-gray-200 hover:bg-gray-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto mt-2"
          >
            <span className="text-base text-white group-hover:text-white font-semibold">
              Log in
            </span>
          </div>

          <div className="flex text-xs justify-center">
            No account?
            <button
              onClick={toggleSignUpForms}
              className="text-blue-500 underline ml-1"
            >
              Create one
            </button>
          </div>

          {/* Separator */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500 text-sm">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div
            onClick={() =>
              signIn("google", { callbackUrl: "http://localhost:3000" })
            }
            className="flex mb-2 my-4 w-80 justify-center items-center gap-3 border border-gray-300 p-2 rounded-md group cursor-pointer hover:shadow-md m-auto"
          >
            <FcGoogle className="text-2xl" />
            <span className="text-base">Continue with Google</span>
          </div>
        </div>
      )}
    </div>
  );
}
