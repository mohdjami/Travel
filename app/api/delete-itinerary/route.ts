import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
  const { id } = await req.json();
  const supabase = createClient();
  const {data: response, error } = await supabase.from("response").delete().match({ id });
  if(error){
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  revalidatePath("/");
  return NextResponse.json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    console.log(error);
    return new Response(`Error: ${error}`);
  }
}