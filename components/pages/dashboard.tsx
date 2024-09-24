"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon, MessageSquare } from "lucide-react";
import ItineraryDisplay from "../travel-itinerary";
import Link from "next/link";

export default function Dashboard({
  data,
  credits,
}: {
  data: {
    id: number;
    name: string;
    response: {
      itinerary: any;
    };
  }[];
  credits: number;
}) {
  const [selectedResponse, setSelectedResponse] = useState({
    id: data[0].id,
    name: data[0].name,
    response: {
      itinerary: data[0].response.itinerary,
    },
  });
  const [showSidebar, setShowSidebar] = useState(false);

  if (selectedResponse.id == null) {
    return (
      <div className="flex h-full bg-gray-100">
        <div className="m-auto text-2xl">Please Start Planning</div>
      </div>
    );
  }
  return (
    <div className="flex h-full bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white w-64 absolute inset-y-0 left-0 transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-10`}
      >
        <div className="p-4">
          <Button className="w-full justify-start text-white" variant="ghost">
            <Link href="/itinerary" className="flex items-center">
              New Itinerary <PlusIcon className="mr-2 h-4 w-4" />
            </Link>
          </Button>
          <Button className="w-full justify-start text-white" variant="ghost">
            Credits: {credits}
          </Button>
          <Button className="w-full justify-start text-white" variant="ghost">
            <Link
              href={`/itinerary/${selectedResponse.id}`}
              className="flex items-center"
            >
              View Single Itinerary
            </Link>
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          {data.map((response) => (
            <Button
              key={response.id}
              variant="ghost"
              className={`w-full justify-start px-4 py-2 text-sm ${
                selectedResponse.id === response.id ? "bg-gray-700" : ""
              }`}
              onClick={() => {
                setSelectedResponse(response);
                setShowSidebar(false);
              }}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              {response.name}
            </Button>
          ))}
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <div className="md:hidden bg-gray-800 text-white p-4">
          <Button
            variant="ghost"
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-white"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </div>

        {/* Response content */}
        {/* <ScrollArea className="flex-1 p-4 md:p-8"> */}
        {/* <ItineraryDisplay
            itinerary={JSON.parse(data[selectedResponse.id]?.response)}
          /> */}

        <div className="flex-1 px-4 md:px-8">
          {data.map((response) => {
            if (response.id == selectedResponse.id) {
              return (
                <ItineraryDisplay
                  key={response.id}
                  name={response.name}
                  itinerary={response.response?.itinerary}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
