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
import { TriangleAlert } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { SignInFlow } from "../auth/types";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>("");

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setPending(true);
    signIn("password", { email, name, password, flow: "signUp" })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setPending(false);
      });
  };

  const handleProvider = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>

        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md mb-6 flex items-center gap-x-2 text-sm text-destructive">
          <TriangleAlert />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} className="space-y-2.5">
          <Input
            placeholder="FullName"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={pending}
          />
          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={pending}
          />
          <Input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={pending}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={pending}
          />
          <Button
            type="submit"
            className="w-full "
            size="lg"
            disabled={pending}
          >
            Continue
          </Button>
        </form>
        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            className="w-full relative"
            variant="outline"
            onClick={() => handleProvider("google")}
            size="lg"
          >
            Continue with Google
            <FcGoogle className="absolute size-5 top-2.5 left-2.5" />
          </Button>
          <Button
            disabled={pending}
            className="w-full relative"
            variant="outline"
            onClick={() => handleProvider("github")}
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
