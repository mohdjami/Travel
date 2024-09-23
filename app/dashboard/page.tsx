import Dashboard from "@/components/pages/dashboard";
import { createClient } from "@/utils/supabase/server";
import { getServerUser } from "@/utils/users/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const supabase = createClient();
  const user = await getServerUser();
  if (!user) {
    redirect("/login");
  }
  const { data, error } = await supabase
    .from("response")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("userid", user.id);

  return <Dashboard data={data} />;
};

export default page;
