import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Linkedin, Send } from "lucide-react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaUser,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-teal-800 text-white ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TravelPlan AI</h3>
            <p className="text-sm">
              Create personalized travel itineraries with the power of AI. Plan
              your dream trip effortlessly.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#home"
                  className="hover:text-teal-300 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-teal-300 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="hover:text-teal-300 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#ready-to-start"
                  className="hover:text-teal-300 transition-colors"
                >
                  Ready to Start?
                </Link>
              </li>
              <li>
                <Link
                  href="/#privacy"
                  className="hover:text-teal-300 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/mohdjami"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300 transition-colors"
              >
                <FaGithub size={24} />
                <span className="sr-only">Github</span>
              </a>
              <a
                href="https://mohdjami.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300 transition-colors"
              >
                <FaUser size={24} />
                <span className="sr-only">Portfolio</span>
              </a>
              <a
                href="https://twitter.com/mohdjami786"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300 transition-colors"
              >
                <FaTwitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com/not_jami"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300 transition-colors"
              >
                <FaInstagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://linkedin.com/in/mohdjami"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300 transition-colors"
              >
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-teal-700 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} TravelPlan AI. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
