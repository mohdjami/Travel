import ItineraryHome from "@/components/itinerary-page";
import { getServerUser } from "@/utils/users/server";
import { redirect } from "next/navigation";
import { getUserCredits } from "../../utils/db/db";

export default async function Home() {
  const user = await getServerUser();
  console.log("user", user);
  if (!user) {
    redirect("/login");
  }
  const credits = await getUserCredits(user?.id);
  
  console.log("credits", credits);
  if (!credits) {
    return <ItineraryHome initialCredits={5} />;
  }
  return <ItineraryHome initialCredits={credits} />;
}
