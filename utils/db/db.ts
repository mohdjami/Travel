import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function createUserPreferences(
  currentLocation: string,
  travelLocation: string,
  startDate: Date,
  endDate: Date,
  budget: number,
  interests: string[],
  userId: string
) {
  const supabase = createClient();
  const { error: errorPreferences } = await supabase
    .from("userpreferences")
    .insert({
      current_location: currentLocation,
      travel_location: travelLocation,
      start_date: startDate,
      end_date: endDate,
      budget: budget,
      interests: interests,
      userid: userId,
    });
  if (errorPreferences) {
    console.log(errorPreferences);
    return NextResponse.json({ error: errorPreferences.message });
  }
}

export async function createResponse(
  name: string,
  itinerary: string,
  userId: string
) {
  const supabase = createClient();
  const { error: errorResponse } = await supabase.from("response").insert({
    name,
    response: itinerary,
    userid: userId,
  });
  if (errorResponse) {
    console.log(errorResponse);
    return NextResponse.json({ error: errorResponse.message });
  }
}

export async function getUserCredits(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("credits")
    .eq("id", userId)
    .single();
  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
  return data.credits;
}

export async function updateUserCredits(userId: string) {
  const supabase = createClient();

  const { error: errorUpdate } = await supabase
    .from("users")
    .update({ credits: supabase.rpc("decrement_credits", { userid: userId }) })
    .eq("id", userId)
    .select("credits");
  if (errorUpdate) {
    console.log(errorUpdate);
    return NextResponse.json({ error: errorUpdate.message });
  }
}
