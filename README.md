[Github](https://github.com/mohdjami/AI-Travel-Itinerary)

Deployed Link: https://travelplanai.vercel.app/

YT Video: https://youtu.be/oeioDsKQ4cQ?si=U35aBhen3L3zJApq

---

# Application Architecture and Flow

---

![diagram-export-24-9-2024-8_43_41-pm.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32c8d686-cb3a-45e8-9bfc-53380f009e76/0c41fed0-a76f-4fe0-bd3e-8d4aa5e4df81/diagram-export-24-9-2024-8_43_41-pm.png)

---

Above diagram gives a high level overview of the Application, services and solutions.

I have leveraged Next.js, Supabase, Gemini-1.5-flash Model, Shadcn, Typescript and Tailwind CSS.

1. Register your account on https://travel-three-lovat.vercel.app/signup
2. You will be logged and redirected to the /[Itinerary](https://travelplanai.vercel.app) Page.
3. Every user receives 5 Credits as I also have limited tokens from Gemini API.
4. Fill the Travel Itinerary form and click on the Generate Button.
5. It will take a few seconds, a request is sent to the Backend with user Preferences data. 
6. The Route handler creates the user preferences dB, creates a Personalized Prompt.
7. The Prompt is sent to the Gemini Model, and the response is received.
8. After receiving the response it is refined, cleaned and parsed to JSON.
9. The response is then stored in the database and sent back to the Client.
10. The Fronted uses Leaflet Maps API to display the location of each Activity.
11. Bingo!! Travel Itinerary is ready to be downloaded in either PDF or TXT format.
12. You can go to the Dashboard to Manage and view recent Itineraries.

# Schema ERDiagram

---

![diagram-export-25-9-2024-12_19_01-pm.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/32c8d686-cb3a-45e8-9bfc-53380f009e76/e44ab66d-c9d7-4f50-88c0-840167748223/diagram-export-25-9-2024-12_19_01-pm.png)

# Implementation Details

---

## I have divided the Application into these Modules.

## Authentication and Authorization

---

- Used Supabase for Authenticating and authorizing users
    
    Why Supabase for Authentication and Data Store?
    
    1. All in one Place, Authentication, Storage, Database.
    2. Supabase is built on top of PostgreSQL, offering a robust and feature-rich database system, which enabled to write raw SQL queries to create Tables, RLS policies and GRANT permissions.
    3. Great developer experience.
- Github
    1. Created a OAuth App in Github and integrated it in Database.
    2. In the auth/callback/route.ts where the code is exchanged for authentication a new user is created in the Database.
- Credentials
    1. User creates an account.
    2. A user is created in the authentication service.
    3. A new user is added to the Users table in Supabase.
 
# Itinerary Generation

---

Here we have used Google gemini-1.5-flash Model.

Next.js for building full stack application.

Next.js is an excellent choice because of Server-Side Rendering, Static Site Generation and SEO.

# Why Next.js?
---

- API Routes made it very easy to create endpoints for the application.
- File Based Routing increases Developer Experience.
- Libraries like Shadcn and Tailwind saves  a lot of time and builds seamless UI.
- First-class TypeScript support without additional configuration which we do not get in Node.js
- Fast and Easy Deployment.
- For a project that requires server-side rendering, API routes, and scalability, Next.js provides a robust, performant, and developer-friendly solution. Its integration with React, built-in optimizations, and strong community support make it an attractive choice for modern web development.

## Travel Itinerary Form

---

After recieiving the User Preferences from the Itinerary Form a request is sent to the Backend with all the data.

## Display Itinerary

---

The itinerary is then used in the Components to display the data. I have also integrated maps from leaflet.

# Gemini-1.5-flash

---

Gemini-1.5-flash is an advanced AI model developed by Google that powers the itinerary generation in our application. This model excels at understanding complex travel preferences and generating detailed, personalized itineraries. By leveraging Gemini-1.5-flash, we're able to create highly tailored travel plans that consider factors such as budget constraints, personal interests, and trip duration.

## Why I used AI instead of Manually making API calls to get Locations Data?

---

It offers several key advantages for our travel itinerary application. Firstly, AI-powered itinerary generation can process vast amounts of data about destinations, attractions, and user preferences much faster and more efficiently than manual methods. Secondly, it allows for highly personalized recommendations that can adapt to each user's unique interests and constraints. Lastly, AI can continually learn and improve its suggestions based on user feedback and travel trends, ensuring our application stays relevant and valuable to travellers.

# Leaflet Maps Integration

---

Leaflet is an open-source JavaScript library for mobile-friendly interactive maps. To integrate Leaflet maps into our travel itinerary application, we followed these key steps:

- Installed the Leaflet package and its React wrapper
- Created a dynamic Map component to handle client-side rendering
- Implemented markers for each activity location in the itinerary

By incorporating Leaflet maps, I enhanced the user experience by providing visual context for each destination and activity within the generated itineraries.

I also faced a problem with leaflet which was that Map component was not loading 100% leading to errors and page not loading properly. So I tackled this problem with this solution.

# Additional Features:

## Credits Based System

---

To enhance the user experience and manage API usage, I implemented a credits-based system. Here's how it works:

- New users receive 5 free credits upon registration
- Each itinerary generation consumes 1 credit
- Users can purchase additional credits as needed(Implement in future)

This system allows us to control API costs while providing users with flexibility in using the service.

## Dashboard

---

The Dashboard provides users with an overview of their generated itineraries, remaining credits, and account information. Key features include:

- A list of recent itineraries.
- Credit balance display and option to purchase more credits

 ## User Profile and Settings

---

The User Profile and Settings section allows users to customize their experience and manage their account information. Key features of this section include:

- Currently users can only update username
- In future I can implement email, password and image upload.

# Qstash

For increasing response time for generating Itineray, I implemented a queue system. 

Processed all the non critical tasks using queue.

### New Problem Occured

While there is an error after generating Itineraries, there should be a fallback mechanism. Right now if there is any error feeding data in database there is no fallback mechanism due to which Itinerary is lost which needs to be fixed.

For now I have disabled RLS Policies. Will work on this 

# Future Improvements

---

Problem:

The travel generation route is taking a lot of time to generate the itineraries.

It contains several processes:

- Receiving user preferences and creating a table in the database.
- Get the current logged-in User.
- Generating the Personalized prompt and sending it to Gemini AI Model.
- Receiving the response, tailoring it, parse the response into JSON as I am storing the response JSON directly in the database.
- Updating the credits user has left.
- Sending back the response.

Solution:

By analyzing the route carefully, I can make it out that Inserting User Preferences, Inserting Response and Updating Credits are non critical tasks and sending the response to the user is the main critical task.

So I can perform these non Critical Tasks Asynchronously by using a queue.

This asynchronous Approach can decrease a lot of Response Time.

## Caching

Implementing a caching mechanism can significantly improve the performance and response time of our travel itinerary application. By caching frequently accessed data, such as popular destinations or common user preferences, we can reduce the load on our servers and provide faster results to users. This could be particularly beneficial for repeat users or for displaying initial recommendations while more personalized results are being generated.

I will do this for Dashboard, I will cache the recently visited Travel Itineraries which will reduce the number of requests to Database eventually making the application Faster.

# Deployment

Dockerized the application for easy deployment on AWS Elastic Container Service which is best approach for autoscaling.

Currently it is deployed on Vercel for demo use.
