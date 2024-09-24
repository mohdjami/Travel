"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Clock, DollarSign, Users } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: <Globe className="h-8 w-8 text-teal-500" />,
      title: "AI-Powered Itineraries",
      description: "Personalized travel plans created just for you.",
    },
    {
      icon: <Clock className="h-8 w-8 text-teal-500" />,
      title: "Time-Saving",
      description: "Plan your entire trip in minutes, not hours.",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-teal-500" />,
      title: "Budget-Friendly",
      description: "Options for every budget, from backpacker to luxury.",
    },
    {
      icon: <Users className="h-8 w-8 text-teal-500" />,
      title: "Local Insights",
      description: "Discover hidden gems with recommendations from locals.",
    },
  ];

  const Owner = [
    {
      name: "Mohd Jami",
      role: "Owner",
      image: "/jami.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold text-center text-teal-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About TravelPlan AI
      </motion.h1>

      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold mb-4 text-teal-700">
              Our Mission
            </h2>
            <p className="text-lg mb-4">
              At TravelPlan AI, we're on a mission to revolutionize the way
              people plan their travels. We believe that everyone deserves a
              perfectly tailored trip, and with the power of AI, we're making
              that a reality.
            </p>
            <p className="text-lg mb-4">
              Our innovative platform combines cutting-edge artificial
              intelligence with a passion for exploration, creating personalized
              itineraries that cater to your unique preferences, budget, and
              travel style.
            </p>
            <Button className="bg-teal-600 hover:bg-teal-700">
              Start Planning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative h-64 md:h-full"
          >
            <Image
              src="/image.png"
              alt="Travel planning"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </motion.div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center text-teal-700">
          Why Choose TravelPlan AI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
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
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center text-teal-700">
          Meet Our Team
        </h2>
        <div className="flex justify-center gap-8">
          {Owner.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card>
                <CardHeader>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto"
                  />
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
