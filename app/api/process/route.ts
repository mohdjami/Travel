import { NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import {
  createResponse,
  createUserPreferences,
  updateUserCredits,
} from "@/utils/db/db";
import { revalidatePath } from "next/cache";

export const POST = verifySignatureAppRouter(async (req: Request) => {
  const body = await req.json();
  try {
    await createUserPreferences(
      body.currentLocation,
      body.travelLocation,
      body.startDate,
      body.endDate,
      body.budget,
      body.interests,
      body.userid
    );
    await createResponse(body.name, body.json, body.userid);
    await updateUserCredits(body.userid);
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return new Response(`Error: ${error}`);
  }
  return new Response(`Done Successfully`);
});
