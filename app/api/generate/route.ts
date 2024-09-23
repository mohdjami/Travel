import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { itinerary } from "./data";
const API_KEY = process.env.GOOGLE_API_KEY!;

export async function POST(req: Request, res: Response) {
  const { currentLocation, travelLocation, startDate, endDate, budget } =
    await req.json();
  console.log(currentLocation, travelLocation, startDate, endDate, budget);
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
            "cost": "Estimated cost in local currency"
            },
            // ... more activities for the day
        ]
        },
        // ... more days
    ]
    }

    Please include a variety of activities suitable for the destination, considering local attractions, cuisine, and culture. Ensure that the activities and costs align with the specified budget level. Provide at least 4-5 activities per day, covering morning, afternoon, and evening. Include specific locations, helpful notes, and estimated costs for each activity. Remember to include a mix of activities that are suitable for the destination, considering local attractions, cuisine, and culture. Ensure that the activities and costs align with the specified budget level. Provide at least 4-5 activities per day, covering morning, afternoon, and evening. Include specific locations, helpful notes, and estimated costs for each activity. 

    Last but not least, send me back json object only.
`;
  //We will also cache the similar responses
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  const text = result.response
    .text()
    .replaceAll("```json", "")
    .replaceAll("```", "");
  const json = JSON.parse(text);
  console.log(json);
  //We will require to save the itinerary to the database we will use kafka as a message queue to save the itinerary to the database because this is a real time application and if we do it here it will cause a delay in sending the response to the user.
  return NextResponse.json({ itinerary: json });
}
