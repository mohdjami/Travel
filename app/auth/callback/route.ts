import { createUser, getUserFromDatabase } from "@/utils/db/user";
import { createClient } from "@/utils/supabase/server";
import { getServerUser } from "@/utils/users/server";
import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/itinerary";
  const error_description = searchParams.get("error_description");
  if (code) {
    const supabase = createClient();
    const { data: userData, error } =
      await supabase.auth.exchangeCodeForSession(code);
    console.log(userData.user, error);
    // const user = await supabase.from("auth.users").select("*");
    // console.log("user", user);
    if (!userData) {
      console.log("Error getting user:");
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }
    //Check if user profile already exists or not.
    const userId = userData?.user?.id;
    console.log("userId", userId);
    if (userId) {
      const userExistsInDatabase = await getUserFromDatabase(userId);
      console.log("userData if usser exists", userData);
      if (userExistsInDatabase === null) {
        if (userData.user) {
          await createUser(userData.user);
          console.log("userData if user not exists", userData);
        }
      }
    }
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
