"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import type { SignInFlow } from "../auth/types";
import { useState } from "react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>

        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={false}
          />
          <Input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={false}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={false}
          />
          <Button type="submit" className="w-full " size="lg" disabled={false}>
            Continue
          </Button>
        </form>
        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={false}
            className="w-full relative"
            variant="outline"
            onClick={() => {}}
            size="lg"
          >
            Continue with Google
            <FcGoogle className="absolute size-5 top-2.5 left-2.5" />
          </Button>
          <Button
            disabled={false}
            className="w-full relative"
            variant="outline"
            onClick={() => {}}
            size="lg"
          >
            Continue with Github
            <FaGithub className="absolute size-5 top-2.5 left-2.5" />
          </Button>
        </div>
        <p className="text-muted-foreground text-xs">
          Already have an account?{" "}
          <span
            className="text-sky-500 hover:underline cursor-pointer"
            onClick={() => setState("signIn")}
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
