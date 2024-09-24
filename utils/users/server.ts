import { User } from "@supabase/supabase-js";
import { createClient } from "../supabase/server";

export async function getServerUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return null;
  }
  return data.user;
}
