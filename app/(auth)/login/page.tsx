import LoginPage from "@/components/forms/log-in-page";
import { getServerUser } from "@/utils/users/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getServerUser();
  if (user) {
    redirect("/itinerary");
  }
  return <LoginPage />;
};

export default page;
