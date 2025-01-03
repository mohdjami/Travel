import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { name, id } = await req.json();
    const supabase = createClient();
    const { data, error } = await supabase
      .from("users")
      .update({
        name,
      })
      .eq("id", id)
      .single();
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
    revalidatePath("/");
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
