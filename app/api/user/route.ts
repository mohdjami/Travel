import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { name, email, bio, avatar_url, id } = await request.json();
    const supabase = createClient();
    const { data, error } = await supabase
      .from("users")
      .update({
        name,
      })
      .eq("id", id)
      .single();
    if (error) {
      return NextResponse.json({ error });
    }
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
