import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { LoginBg, Logo } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "rsuite";
import { buttonClick } from "../animations";
import { app } from "../config/firebase.config";
import { validateJwtToken } from "../helpers";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../redux/actions/userActions";
import { alertInfo, alertWarning } from "../redux/actions/alertActions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);
  useEffect(() => {
    if (users) {
      navigate("/", { replace: true });
    }
  }, [users]);
  const loginWithGoogle = async () => {
    await signInWithPopup(auth, provider).then(() =>
      auth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) =>
            validateJwtToken(token).then((data) => {
              if (data) {
                dispatch(setUserDetails(data));
              }
              navigate("/", { replace: true });
            })
          );
        }
      })
    );
  };
  const handleSignIn = async () => {
    if (email !== "" && password !== "") {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        auth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) =>
              validateJwtToken(token).then((data) => {
                console.log("toke", token);
                if (data) {
                  dispatch(setUserDetails(data));
                }
                setLoading(false);
                navigate("/", { replace: true });
              })
            );
          }
        });
      });
    } else {
      dispatch(alertWarning("Password Does not match"));
    }
  };
  const handleSignUp = async () => {
    if (email === "" || password === "" || confirmPassword === "") {
      dispatch(alertInfo("Required filed should not be empty"));
    } else {
      if (password === confirmPassword) {
        setEmail("");
        setConfirmPassword("");
        setPassword("");
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password).then(() => {
          auth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) =>
                validateJwtToken(token).then((data) => {
                  console.log("toke", token);
                  if (data) {
                    dispatch(setUserDetails(data));
                  }
                  navigate("/", { replace: true });
                })
              );
            }
          });
        });
        setLoading(false);
      } else {
        console.log("password does not match");
        dispatch(alertWarning("Password Does not match"));
      }
    }
  };
  const handleLogin = () => {
    if (isSignUp) {
      handleSignUp();
    } else {
      handleSignIn();
    }
  };
  return (
    <div className="w-screen h-screen overflow-hidden flex relative">
      <img
        src={LoginBg}
        className="h-full w-full object-cover absolute top-0 left-0"
      />
      <div className="flex flex-col items-center bg-lightOverlay z-10 w-[80%] md:w-508 h-full backdrop-blur-md p-4 px-4 py-12 gap-6">
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-[40px]" alt="logo" />
          <p className="text-headingColor font-semibold text-xl">Eats Now</p>
        </div>
        <p className="text-3xl font-semibold text-headingColor">Welcome Back</p>
        <p className="text-textColor text-xl -mt-6">
          {isSignUp ? "Sign up" : "Sign in"}With Following
        </p>
        <div className="w-full flex flex-col justify-center items-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeholder="E-mail"
            icon={<FaEnvelope className="text-xl text-textColor" />}
            type="email"
            inputState={email}
            inputStateFunc={setEmail}
            signUp={isSignUp}
          />
          <LoginInput
            placeholder="Password"
            icon={<FaLock className="text-xl text-textColor" />}
            type="password"
            inputState={password}
            inputStateFunc={setPassword}
            signUp={isSignUp}
          />
          {isSignUp && (
            <LoginInput
              placeholder="Confirm Password"
              icon={<FaLock className="text-xl text-textColor" />}
              type="password"
              inputState={confirmPassword}
              inputStateFunc={setConfirmPassword}
              signUp={isSignUp}
            />
          )}
          {!isSignUp ? (
            <p>
              Doesn't have Account{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline cursor-pointer"
                onClick={() => setIsSignUp(true)}
              >
                craete one
              </motion.button>{" "}
            </p>
          ) : (
            <p>
              Already have an account
              <motion.button
                {...buttonClick}
                className="text-red-400 underline cursor-pointer ml-1"
                onClick={() => setIsSignUp(false)}
              >
                sign in here
              </motion.button>{" "}
            </p>
          )}
          <motion.button
            {...buttonClick}
            onClick={handleLogin}
            className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-xl capitalize text-white hover:bg-red-500 transition-all duration-156"
          >
            {loading ? (
              <Loader size="small" />
            ) : isSignUp ? (
              "Sign up"
            ) : (
              "Sign in"
            )}
          </motion.button>
        </div>
        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md  bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded-md  bg-white"></div>
        </div>
        <motion.div
          {...buttonClick}
          onClick={loginWithGoogle}
          className="flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer gap-4 rounded-3xl"
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColor">
            Sign in with Google
          </p>
        </motion.div>
      </div>
    </div>
  );
}
