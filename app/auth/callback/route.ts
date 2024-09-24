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
    const { data: userData, error: UserError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData?.user?.id)
      .single();
    if (userData) {
      console.log("User exists");
    }
    if (!userData || UserError) {
      const { data: userData, error: UserError } = await supabase
        .from("users")
        .insert({
          id: authData?.user?.id,
          name: authData?.user?.user_metadata.full_name,
          avatar: authData?.user?.user_metadata.avatar_url,
          email: authData?.user?.email,
          email_verified: authData?.user?.user_metadata.email_verified,
          credits: 5,
        });
      if (userData) {
        console.log("User created");
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
