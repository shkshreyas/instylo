import { Routes, Route } from "react-router-dom";

import {
  Home,
  Explore,
  Saved,
  CreatePost,
  Profile,
  EditPost,
  PostDetails,
  UpdateProfile,
  AllUsers,
  StudyBuddy,
  StudySession,
  StudySessionNew,
  Communities,
  Services,
  Marketplace,
  VideoCall,
  News,
  Games,
} from "@/_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignupForm from "@/_auth/forms/SignupForm";
import SigninForm from "@/_auth/forms/SigninForm";
import { Toaster } from "@/components/ui/toaster";
import Chatbot from "@/components/chatbot/Chatbot";

import "./globals.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/study-buddy" element={<StudyBuddy />} />
          <Route path="/study-session/:id" element={<StudySession />} />
          <Route path="/study-session/new" element={<StudySessionNew />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/communities/:id" element={<Communities />} />
          <Route path="/communities/create" element={<Communities />} />
          <Route path="/services" element={<Services />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/video-call" element={<VideoCall />} />
          <Route path="/video-call/:roomId" element={<VideoCall />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/saved" element={<News />} />
          <Route path="/games" element={<Games />} />
        </Route>
      </Routes>

      {/* Chatbot component is rendered outside of the Routes */}
      <Chatbot />
      
      <Toaster />
    </main>
  );
};

export default App;
