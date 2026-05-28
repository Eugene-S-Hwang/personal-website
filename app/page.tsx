"use client";
import Layout from "@/components/Layout";
import ActivitiesPage from "@/components/pages/ActivitiesPage";
import BlogPage from "@/components/pages/BlogPage";
import ContactPage from "@/components/pages/ContactPage";
import HomePage from "@/components/pages/HomePage";
import ProjectsPage from "@/components/pages/ProjectsPage";
import { useState } from "react";

// ─── Font loader (add to your layout.tsx instead if preferred) ───────────────
// In layout.tsx: import { Press_Start_2P, DM_Mono } from "next/font/google"
// Then pass className to <body>. For portability we load via <link> here.

export default function Home() {
  const [activeView, setActiveView] = useState("home");

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomePage />;
      case 'activities':
        return <ActivitiesPage />;
      case 'blog':
        return <BlogPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'contacts':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout activeView={activeView} onNavigate={setActiveView}>
      {renderView()}
    </Layout>
  );


}