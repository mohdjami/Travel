import LoginPage from "@/components/forms/log-in-page";
import { getServerUser } from "@/utils/users/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { message: string };
}) => {
  const user = await getServerUser();
  if (user) {
    redirect("/itinerary");
  }
  return <LoginPage message={searchParams.message} />;
};

export default page;
