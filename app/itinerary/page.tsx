import TravelItineraryForm from "@/components/forms/travel-form";
import { createClient } from "@/utils/supabase/server";
import { getServerUser } from "@/utils/users/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getUserCredits } from "../../utils/db/db";

export default async function Home() {
  const user = await getServerUser();
  if (!user) {
    redirect("/login");
  }
  const credits = await getUserCredits(user?.id);

  return <TravelItineraryForm credits={credits} />;
}
