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
        redirectTo: `${
          typeof window !== "undefined" ? window.location.origin : ""
        }/auth/callback`,
      },
    });

    if (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    } else if (data?.url) {
      router.push(data.url);
    }
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
