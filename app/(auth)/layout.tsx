import { getServerUser } from "@/utils/users/server";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = async ({ children }) => {
  const user = await getServerUser();
  if (user) {
    redirect("/dashboard");
  }
  return <div className="  p-10 rounded-md">{children}</div>;
};

export default AuthLayout;
