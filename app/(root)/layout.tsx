"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import LeftSidebar from "@/components/shared/LeftSidebar";
import { useAuth } from "@/context/AuthContext";
import LeadProfile from "@/components/shared/LeadProfile";
import { LeadContextProvider } from "@/context/LeadContext";

const Layout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token || !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <LeadContextProvider>
      <main className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen w-full flex-1">
          {children}
        </section>
        <LeadProfile />
      </main>
    </LeadContextProvider>
  );
};

export default Layout;
