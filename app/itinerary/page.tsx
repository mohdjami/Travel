import TravelItineraryForm from "@/components/forms/travel-form";
import { createClient } from "@/utils/supabase/server";
import { getServerUser } from "@/utils/users/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getServerUser();
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("credits")
    .eq("id", user?.id)
    .single();
  if (!user) {
    redirect("/login");
  }
  return <TravelItineraryForm credits={data?.credits} />;
}
