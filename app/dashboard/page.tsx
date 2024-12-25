import Dashboard from "@/components/pages/dashboard";
import { createClient } from "@/utils/supabase/server";
import { getServerUser } from "@/utils/users/server";
import { redirect } from "next/navigation";
import React from "react";
import { getUserCredits } from "../../utils/db/db";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const supabase = createClient();
  const user = await getServerUser();
  if (!user) {
    redirect("/login");
  }
  const { data, error } = await supabase
    .from("response")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("userid", user?.id);
  const credits = await getUserCredits(user?.id);
  if (error || !data || data.length === 0) {

    return  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div className="text-center space-y-6 max-w-md">
      <div className="relative w-64 h-64 mx-auto">
        <Image
          src="/image.png"
          alt="Create your first itinerary"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Travel Dashboard</h1>
      <p className="text-xl text-gray-600">
        You haven't created any itineraries yet. Start planning your next adventure!
      </p>
      <Link href="/itinerary"  className="mt-8 inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
        <PlusCircle className="mr-2 h-5 w-5" />
        Create Your First Itinerary
      </Link>
    </div>
  </div>
  }
  return <Dashboard data={data} credits={credits} />;
};

export default page;
