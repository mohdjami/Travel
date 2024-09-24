import SignUpPage from "@/components/forms/sign-up-page";
import { getServerUser } from "@/utils/users/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getServerUser();
  if (user) {
    redirect("/itinerary");
  }
  return <SignUpPage />;
};

export default page;
