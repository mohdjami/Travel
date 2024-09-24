import TravelItineraryForm from "@/components/forms/travel-form";
import { getServerUser } from "@/utils/users/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  const user = getServerUser();
  // if (!user) {
  //   redirect("/login");
  // }
  return <TravelItineraryForm />;
}
