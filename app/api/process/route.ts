import { NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import {
  createResponse,
  createUserPreferences,
  updateUserCredits,
} from "@/utils/db/db";

export const POST = verifySignatureAppRouter(async (req: Request) => {
  const body = await req.json();
  await createUserPreferences(
    body.currentLocation,
    body.travelLocation,
    body.startDate,
    body.endDate,
    body.budget,
    body.interests,
    body.userid
  );
  await createResponse(body.name, body.itinerary.itinerary, body.userid);
  await updateUserCredits(body.userid);
  return new Response(`Done Successfully`);
});
