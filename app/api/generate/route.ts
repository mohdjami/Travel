import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getServerUser } from "@/utils/users/server";
const API_KEY = process.env.GOOGLE_API_KEY!;

export async function POST(req: Request, res: Response) {
  try {
    const {
      currentLocation,
      travelLocation,
      startDate,
      endDate,
      budget,
      interests,
    } = await req.json();
    const supabase = createClient();
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json({
        error: "User not found",
      });
    }
    if (
      !currentLocation ||
      !travelLocation ||
      !startDate ||
      !endDate ||
      !budget
    ) {
      return NextResponse.json({
        error: "All fields are required",
      });
    }
    // console.log(currentLocation, travelLocation, startDate, endDate, budget);
    //Insert these details into user preferneces table in supabase
    const { error: errorPreferences } = await supabase
      .from("userpreferences")
      .insert({
        current_location: currentLocation,
        travel_location: travelLocation,
        start_date: startDate,
        end_date: endDate,
        //budget is in the select format
        budget: budget,
        interests: interests,
        userid: user.id,
      });
    if (errorPreferences) {
      console.log(errorPreferences);
      return NextResponse.json({ error: errorPreferences.message });
    }
    const prompt = `Create a detailed travel itinerary for a trip from ${currentLocation} to ${travelLocation}, starting on ${startDate} and ending on ${endDate}, with a ${budget} budget. Please provide a day-by-day schedule in the following JSON format:

    {
    "itinerary": [
        {
        "day": "Date (e.g., 22 September)",
        "activities": [
            {
            "time": "Time of activity (e.g., 9:00 AM)",
            "activity": "Description of the activity",
            "location": "Specific location of the activity",
            "notes": "Any relevant notes or tips",
            "cost": "Estimated cost in local currency",
            "long":"Longitude of the location",
            "lat":"Latitude of the location"
            },
            // ... more activities for the day
        ]
        },
        // ... more days
    ]
    }

    Please include a variety of activities suitable for the destination, considering local attractions, cuisine, and culture. Ensure that the activities and costs align with the specified budget level. Please also consider user has ${interests} interests. Provide at least 4-5 activities per day, covering morning, afternoon, and evening. Include specific locations, helpful notes, and estimated costs for each activity. Remember to include a mix of activities that are suitable for the destination, considering local attractions, cuisine, and culture. Ensure that the activities and costs align with the specified budget level. Provide at least 4-5 activities per day, covering morning, afternoon, and evening. Include specific locations, helpful notes, longitude and latitude values of locations and estimated costs for each activity. 

    Last but not least, send me back json object only.
`;
    //We will also cache the similar responses
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    // console.log(result.response.text());
    const text = result.response
      .text()
      .replaceAll("```json", "")
      .replaceAll("```", "");
    const json = JSON.parse(text);

    const { error: errorResponse } = await supabase.from("response").insert({
      name: `${currentLocation.split(",")[0]} to ${
        travelLocation.split(",")[0]
      }`,
      response: json,
      userid: user.id,
    });
    if (errorResponse) {
      console.log(errorResponse);
      return NextResponse.json({ error: errorResponse.message });
    }
    const { error: errorInsert } = await supabase.from("itinerary").insert({
      itinerary: json,
      userid: user.id,
    });
    if (errorInsert) {
      console.log(errorInsert);
      return NextResponse.json({ error: errorInsert.message });
    }
    return NextResponse.json({ itinerary: json });
  } catch (error) {
    console.log(error);
    console.log(error);
    return NextResponse.json({
      error: (error as Error)?.message || "An unknown error occurred",
    });
  }
}
