import { createClient } from "@/utils/supabase/server";
import { getServerUser } from "@/utils/users/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const user = await getServerUser();
    const supabase = createClient();
    const { data, error } = await supabase
      .from("users")
      .select("credits")
      .eq("id", user?.id)
      .single();
    if (!data) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    if (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 400 });
    }
    revalidatePath("/");
    return NextResponse.json({ credits: data?.credits });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
