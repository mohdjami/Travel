import { createClient } from "../supabase/client";

export default async function getClientUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return null;
  }
  return data.user;
}
