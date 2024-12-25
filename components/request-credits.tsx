import { Card, CardTitle, CardContent, CardDescription, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"
import { Mail } from "lucide-react"

export const RequestCredits = ({email}:{
    email: string
}) => {   

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="relative w-24 h-24 mx-auto">
              <Image
                src="/placeholder.svg?height=96&width=96"
                alt="Out of credits"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Out of Credits</h2>
            <p className="text-gray-600">
              You've used all your credits. To continue planning your adventures, please request more credits.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href={`mailto:${email}?subject=Request%20for%20More%20Credits&body=Hello,%0D%0A%0D%0AI've run out of credits and would like to request more to continue using the service.%0D%0A%0D%0AThank you!`}>
            <Button variant="outline" className="mt-4">
              <Mail className="mr-2 h-4 w-4" />
                Request More Credits
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
}