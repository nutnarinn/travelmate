import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import LoginForm from "./LoginForm";

export default function SignUpForm() {
  const [showLogin, setShowLogin] = useState(false);

  const toggleLoginForms = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {showLogin ? (
        <LoginForm toggleForms={toggleLoginForms} />
      ) : (
        <div>
          <div
            onClick={() =>
              signIn("google", { callbackUrl: "http://localhost:3000" })
            }
            className="flex mb-2 my-4 w-60 justify-center items-center gap-3 border border-gray-300 p-2 rounded-md group cursor-pointer hover:shadow-md m-auto"
          >
            <FcGoogle className="text-2xl" />
            <span className="text-base">Continue with Google</span>
          </div>
          <div className="flex text-xs justify-center">
            Already have an account?
            <button
              onClick={toggleLoginForms}
              className="text-blue-500 underline ml-1"
            >
              Log in
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
