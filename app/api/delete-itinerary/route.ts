import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
  const { id } = await req.json();
  const supabase = createClient();
  const response = await supabase.from("response").delete().match({ id });
  revalidatePath("/");
  return NextResponse.json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    console.log(error);
    return new Response(`Error: ${error}`);
  }
}