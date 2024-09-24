import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function createUser(user: User) {
  const supabase = await createClient();
  const { data: userData, error: UserError } = await supabase
    .from("users")
    .insert({
      id: user?.id,
      name: user?.user_metadata.full_name,
      avatar: user?.user_metadata.avatar_url,
      email: user?.email,
      email_verified: user?.user_metadata.email_verified,
      credits: 5,
    });
  if (userData) {
    console.log("User created");
    return userData;
  }
  if (UserError) {
    console.log("Error creating user:", UserError);
    return UserError;
  }
}

export async function getUserFromDatabase(userId: string) {
  const supabase = await createClient();
  const { data: userData, error: UserError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  if (userData) {
    console.log("User exists");
  }
  if (UserError) {
    console.log("Error getting user:", UserError);
    return UserError;
  }
  return userData;
}
