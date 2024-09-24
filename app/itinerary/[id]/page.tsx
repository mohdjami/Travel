import { getServerUser } from "@/utils/users/server";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import ItineraryDisplay from "@/components/travel-itinerary";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const user = await getServerUser();
  const supabase = createClient();
  const { data, error } = await supabase
    .from("response")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("userid", user?.id)
    .eq("id", params.id)
    .single();
  return (
    <div>
      <ItineraryDisplay itinerary={data.response.itinerary} />
    </div>
  );
};

export default page;
