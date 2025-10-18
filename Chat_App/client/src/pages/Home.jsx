import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/ContextContainer";

const Home = () => {
  const [stage, setStage] = useState("signin");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");


  const {signin, signup} = useContext(UserContext);

  const handleSignin = async (e) =>{
    e.preventDefault();
    signin({
      email,
      pass,
    })
  }
    const handleSignup = async (e) => {
      e.preventDefault();
      signup({
        username,
        email,
        pass,
      });
    };
 

  return (
    <div className="w-screen h-screen bg-center bg-cover bg-[url('/bg.jpg')] flex justify-center items-center overflow-hidden">
      <div className="bg-white shadow-gray-500 rounded-2xl flex flex-col items-center px-12">
        <div className="flex flex-row items-center gap-2 text-3xl font-bold m-8">
          <FontAwesomeIcon icon={faComments} className="text-blue-400" />
          <h1 className="text-blue-400">
            Quick
            <span className="text-red-500"> Chat</span>
          </h1>
        </div>
        {stage === "signin" && (
          <>
            <form
              onSubmit={handleSignin}
              action=""
              className="flex flex-col gap-[1vh]"
            >
              <h2 className="font-semibold text-2xl space-y-4">Welcome back</h2>
              <p>Login to your QuickChat account</p>
              <label htmlFor="" className="text-2xl">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="m@example.com"
                className="border border-gray-400 w-[80vw] sm:w-[16vw] h-[4vh] px-4 py-6"
              />
              <label htmlFor="" className="text-2xl">
                PassWord
              </label>
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="****"
                className="border border-gray-400 w-[80vw] sm:w-[16vw] h-[4vh] px-4 py-6 "
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-4 rounded-xl my-6 hover:bg-gray-800 hover:cursor-pointer"
              >
                Login
              </button>
            </form>
            <div className="py-4">
              <p>
                Dont have an account?
                <span
                  className="underline hover:cursor-pointer "
                  onClick={() => setStage("signup")}
                >
                  Sign up
                </span>
              </p>
            </div>{" "}
          </>
        )}
        {stage === "signup" && (
          <>
            <form
              onSubmit={handleSignup}
              action=""
              className="flex flex-col gap-[1vh]"
            >
              <h2 className="font-semibold text-2xl space-y-4">
                Welcome to registration center
              </h2>
              <p>Register your QuickChat account !</p>
              <label htmlFor="" className="text-2xl">
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                value={username}
                placeholder="duy"
                className="border border-gray-400 h-[4vh] px-4 py-6"
              />
              <label htmlFor="" className="text-2xl">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="m@example.com"
                className="border border-gray-400 h-[4vh] px-4 py-6"
              />
              <label htmlFor="" className="text-2xl">
                PassWord
              </label>
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="****"
                className="border border-gray-400 h-[4vh] px-4 py-6 "
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-4 rounded-xl my-6 hover:cursor-pointer hover:bg-gray-800"
              >
                Register
              </button>
            </form>
            <div className="py-4">
              <p>
                Already have an account?
                <span
                  className="underline hover:cursor-pointer"
                  onClick={() => setStage("signin")}
                >
                  Sign in
                </span>
              </p>
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
