import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import SignUpForm from "./SignUpForm";

export default function LoginForm() {
    const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUpForms = () => {
    setShowSignUp(!showSignUp);
  };
  return (
    <div>
      {showSignUp ? (
        <SignUpForm toggleForms={toggleSignUpForms} />
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
            No account?
            <button
              onClick={toggleSignUpForms}
              className="text-blue-500 underline ml-1"
            >
              Create one
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
