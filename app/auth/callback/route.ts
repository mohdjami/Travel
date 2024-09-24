import { createUser, getUserFromDatabase } from "@/app/api/db/user";
import { createClient } from "@/utils/supabase/server";
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
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    console.log(error);
    const { data: authData, error: AuthError } = await supabase.auth.getUser();
    if (AuthError) {
      console.log("Error getting user:", AuthError);
    }
    //Check if user profile already exists or not.
    const userId = authData?.user?.id;
    if (userId) {
      const userData = await getUserFromDatabase(userId);
      if (!userData) {
        const user = authData?.user;
        if (user) {
          await createUser(user);
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
