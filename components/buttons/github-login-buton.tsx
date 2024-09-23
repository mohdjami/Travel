"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { ImSpinner2 } from "react-icons/im";
import { createClient } from "@/utils/supabase/client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
const GithubLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleGithubLogin = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
    if (error) {
      console.log("Error signing in with GitHub:", error);
    } else {
      console.log("Redirecting to dashboard");
      router.push("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handleGithubLogin}
      >
        {isLoading ? (
          <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GitHubLogoIcon className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </>
  );
};

export default GithubLoginButton;
