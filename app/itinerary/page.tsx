import ItineraryHome from "@/components/itinerary-page";
import { getServerUser } from "@/utils/users/server";
import { redirect } from "next/navigation";
import { getUserCredits } from "../../utils/db/db";

export default async function Home() {
  const user = await getServerUser();
  const email = user?.user_metadata.email;
  if (!user) {
    redirect("/login");
  }
  const credits = await getUserCredits(user?.id);
  
  if (!credits) {
    return <ItineraryHome email={email} initialCredits={0} />;
  }
  return <ItineraryHome email={email} initialCredits={credits} />;
}
