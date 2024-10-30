"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  MapPin,
  Calendar,
  DollarSign,
  Compass,
} from "lucide-react";
import Link from "next/link";
import { MdDeveloperMode } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";

export default function Hero() {
  const features = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Personalized Itineraries",
      description: "Get custom travel plans tailored to your preferences.",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Smart Scheduling",
      description: "Optimize your time with intelligent activity planning.",
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Budget Friendly",
      description: "Find the best experiences within your budget.",
    },
    {
      icon: <Compass className="h-6 w-6" />,
      title: "Local Insights",
      description: "Discover hidden gems with local recommendations.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-200 lg:px-20"
      id="home"
    >
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-teal-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Plan Your Dream Trip with AI
          </motion.h2>
          <motion.p
            className="text-xl text-teal-800 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Create personalized travel itineraries in seconds
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
          >
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Link href="/itinerary" className="flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Link
                href="https://youtu.be/oeioDsKQ4cQ?si=U35aBhen3L3zJApq"
                className="flex items-center"
              >
                Watch Demo
                <BsYoutube className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </section>

        <section className="mb-16" id="how-it-works">
          <h3 className="text-2xl font-semibold text-teal-800 mb-8 text-center">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Enter Your Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                Tell us about your destination, dates, and interests.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>2. AI Generates Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                Our AI creates a personalized travel plan just for you.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>3. Download Your Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                Download your itinerary in many formats and start your journey!
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16" id="features">
          <h3 className="text-2xl font-semibold text-teal-800 mb-8 text-center">
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {feature.icon}
                    <span className="ml-2">{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center" id="ready-to-start">
          <h3 className="text-2xl font-semibold text-teal-800 mb-8">
            Ready to Start Planning?
          </h3>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            <Link href="/itinerary" className="flex items-center">
              Create Your Itinerary
              <ArrowRight className="ml-1 h-2 w-2" />
            </Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
