import { getServerUser } from "@/utils/users/server";
import React from "react";

const page = async () => {
  const user = await getServerUser();
  console.log(user);
  return <div>page</div>;
};

export default page;
