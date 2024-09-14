"use client";
import { useState } from "react";
import type { SignInFlow } from "../auth/types";
export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");

  return (
    <div className="flex justify-center items-center bg-white">
      <div className="md:h-auto md:w-[420px]">Auth Screen</div>
    </div>
  );
};
