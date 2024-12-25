import ItineraryHome from "@/components/itinerary-page";
import { getServerUser } from "@/utils/users/server";
import { redirect } from "next/navigation";
import { getUserCredits } from "../../utils/db/db";

export default async function Home() {
  const user = await getServerUser();
  if (!user) {
    redirect("/login");
  }
  const credits = await getUserCredits(user?.id);
  
  if (!credits) {
    return <ItineraryHome initialCredits={0} />;
  }
  return <ItineraryHome initialCredits={credits} />;
}
