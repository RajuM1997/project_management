"use client";

import { useRouter } from "next/router";
import { useState } from "react";

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidEmail(email) && username.length > 3) {
      router.push("/project");
    } else {
      alert(
        "Invalid email address and username. Please enter a valid email and user should be up to 3 ."
      );
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        action=""
        className=" h-screen flex justify-center items-center flex-col gap-4"
      >
        <input
          type="text"
          placeholder="username"
          className="h-10 px-3 rounded"
          required
        />
        <input
          type="email"
          placeholder="email"
          className="h-10 px-3 rounded"
          required
        />
        <div>
          <button className=" bg-yellow-500 py-2 px-7 rounded-md text-base text-black font-semibold">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
