import axios from "axios";
import { useCallback, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";

import Input from "@/components/Input";

import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  const router = useRouter();

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover min-h-[100vh]">
      <div className="bg-black w-full h-full lg:bg-opacity-50 min-h-[100vh]">
        <nav>
          <div
            onClick={() => {
              router.push("/");
            }}
            className="p-5 lg:px-12 lg:py-5 inline-block cursor-pointer transition duration-300 hover:opacity-80"
          >
            <img src="/images/logo.png" alt="logo" className="h-6 lg:h-12 " />
          </div>
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 p-5 lg:p-16 self-center mt-2 lg:w-2/5 max-w-[320px] lg:max-w-md rounded-md w-full ">
            <h2 className="text-white text-3xl lg:text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(e: any) => setName(e.target.value)}
                  id="name"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Log in" : "Sign up"}
            </button>
            <div className="text-center mt-6 flex items-center justify-center">
              <span className="text-white mr-3">Or log in with</span>
              <div className="inline-flex flex-row items-center gap-4 justify-center">
                <div
                  onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                >
                  <FcGoogle size={30} />
                </div>
                {/* <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} /> */}
                {/* </div> */}
              </div>
            </div>
            <p className="text-neutral-500 text-center mt-6 mb-20 lg:mb-0">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Log in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
