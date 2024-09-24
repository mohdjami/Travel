import { createClient } from "@/utils/supabase/server";
import { getServerUser } from "@/utils/users/server";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const user = await getServerUser();
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("credits")
    .eq("id", user?.id)
    .single();
  if (!data) {
    console.log("User not found");
    return NextResponse.json({ error: "User not found" });
  }
  if (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
  return NextResponse.json({ credits: data?.credits });
}
