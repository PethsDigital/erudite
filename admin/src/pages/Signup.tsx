import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import PasswordInput from "../components/PasswordInput";
import TextInput from "../components/TextInput";
import googleIcon from "../assets/icons/google.svg";
import SelectInput from "../components/SelectInput";

export default function Signup() {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    username: "",
    gender: "",
    phone: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  return (
    <div className="text-left mt-[41px] mx-2 lg:mx-0">
      <h2 className="text-black text-poppins font-semibold text-2xl leading-9 mb-4">
        Create Account
      </h2>

      <span className="text-[#3D90EFFC] opacity-[99%] text-lg leading-[27px] text-poppins">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Senectus justo
        nulla cong
      </span>

      <form className="mt-10 flex flex-col" onSubmit={handleSubmit}>
        <div className="mb-12">
          <TextInput
            handleChange={handleChange}
            name="fullname"
            id="fullname"
            type="text"
            label="Full Name"
            placeholder="Full Name"
          />
        </div>

        <div className="mb-12">
          <TextInput
            handleChange={handleChange}
            name="email"
            id="email"
            type="text"
            label="Email Address"
            placeholder="Email"
          />
        </div>

        <div className="mb-12">
          <TextInput
            handleChange={handleChange}
            name="username"
            id="username"
            type="text"
            label="Username"
            placeholder="Username"
          />
        </div>

        <div className="mb-12">
          <SelectInput
            handleChange={handleChange}
            id="gender"
            label="Gender"
            name="gender"
            options={["Male", "Female"]}
            defaultValue="Gender"
          />
        </div>

        <div className="mb-12">
          <PasswordInput
            id="password"
            label="Password"
            name="password"
            inputState={values.showPassword}
            handleChange={handleChange}
            handleVisibility={handleClickShowPassword}
            placeholder="Password"
          />
        </div>

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm Password"
          inputState={values.showConfirmPassword}
          handleChange={handleChange}
          handleVisibility={handleClickShowConfirmPassword}
        />

        <span className="text-[#121921FC] text-lg leading-[21.09px] text-montserrat opacity-[99%] mt-8">
          By clicking on ‘Create Account’, you agree to our{" "}
          <NavLink to="" className="text-[#3D90EFFC]">
            Terms and Conditions
          </NavLink>
          and{" "}
          <NavLink to="" className="text-[#3D90EFFC]">
            Privacy policy
          </NavLink>
        </span>

        <button
          className="text-poppins text-white py-[9px] bg-[#3D90EFFC] hover:bg-[#3d90efdf] bg-opacity-[99%] rounded-[15px] mt-8"
          type="submit"
        >
          Sign Up
        </button>
      </form>

      <span className="block text-center my-6 text-[#333333] text-lg leading-[21px]">
        - Or Login with-
      </span>

      <button className="text-poppins font-semibold text-xl leading-[30px] py-[9px] border border-[#3D90EFFC] hover:bg-[#3D90EFFC] hover:text-white bg-opacity-[99%] rounded-[15px] flex items-center justify-center w-full">
        <img src={googleIcon} alt="Google Icon" className="pr-[6px]" />
        Google
      </button>

      <div className="text-center text-[#121921FC] text-lg leading-[27px] mt-[14px]">
        Already have an account?{" "}
        <span className="font-medium">Click Login</span>{" "}
        <span className="sm:hidden font-medium">below</span>{" "}
        <span className="hidden sm:inline font-medium">on the right</span>
      </div>
    </div>
  );
}
