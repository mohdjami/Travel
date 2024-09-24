import ProfileSettingsPage from "@/components/pages/Profile";
import { getServerUser } from "@/utils/users/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getServerUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen lg:mx-20">
      <ProfileSettingsPage user={user} />
    </main>
  );
};

export default page;
