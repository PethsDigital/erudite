import React, { FormEvent, useState } from "react";
import googleIcon from "../assets/icons/google.svg";

import { NavLink } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import TextInput from "../components/TextInput";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="text-left mt-[88px] mx-2 lg:mx-0">
      <h2 className="text-black text-poppins font-semibold text-2xl leading-9 mb-4">
        Login
      </h2>

      <span className="text-[#3D90EFFC] opacity-[99%] text-lg leading-[27px] text-poppins">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Senectus justo
        nulla cong
      </span>

      <form className="mt-10 flex flex-col" onSubmit={handleSubmit}>
        <div className="mb-12">
          <TextInput
            handleChange={handleChange}
            name="email"
            id="email"
            type="email"
            label="Email Address"
            placeholder="Email Address"
          />
        </div>

        <PasswordInput
          id="password"
          label="Password"
          name="password"
          inputState={values.showPassword}
          handleChange={handleChange}
          handleVisibility={handleClickShowPassword}
          placeholder="Password"
        />

        <button
          className="text-poppins text-white py-[9px] bg-[#3D90EFFC] hover:bg-[#3d90efdf] bg-opacity-[99%] rounded-[15px] mt-8"
          type="submit"
        >
          Login
        </button>
      </form>

      <span className="block text-center my-6 text-[#333333] text-lg leading-[21px]">
        - Or Login with-
      </span>

      <button className="text-poppins font-semibold text-xl leading-[30px] py-[9px] border border-[#3D90EFFC] hover:bg-[#3D90EFFC] hover:text-white bg-opacity-[99%] rounded-[15px] flex items-center justify-center w-full">
        <img src={googleIcon} alt="Google Icon" className="pr-[6px]" />
        Google
      </button>

      <span className="my-4 block text-center font-medium text-lg leading-[27px] text-[#121921FC]">
        <NavLink to="/">Forgot password?</NavLink>
      </span>

      <div className="text-center text-[#121921FC] text-lg leading-[27px]">
        Are you a new user{" "}
        <span className="font-medium">Click Sign up button</span>{" "}
        <span className="sm:hidden font-medium">below</span>{" "}
        <span className="hidden sm:inline font-medium">on the right</span>
      </div>
    </div>
  );
}
