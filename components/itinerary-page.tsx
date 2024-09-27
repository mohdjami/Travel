"use client";

import { useState } from "react";
import TravelItineraryForm from "./forms/travel-form";
const ItineraryHome = ({ initialCredits }: { initialCredits: number }) => {
  const [credits, setCredits] = useState(initialCredits);
  return (
    <TravelItineraryForm initialCredits={credits} setCredits={setCredits} />
  );
};

export default ItineraryHome;
