"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { sidebarLinks } from "@/constants";
import UserProfileOverlay from "@/components/shared/UserProfileOverlay";
import Avatar from "@/components/shared/Avatar";
import { useAuth } from "@/context/AuthContext";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { user, isOnline } = useAuth();

  const [showUserProfileOverlay, setShowUserProfileOverlay] = useState(false);

  const handleShowUserProfileOverlay = () => {
    setShowUserProfileOverlay(!showUserProfileOverlay);
  };

  return (
    <div className="flex min-h-screen w-24 flex-col border-r p-6">
      <div className="mb-10">
        <Image
          src="/assets/icons/logo2.svg"
          alt="Logo"
          width={48}
          height={48}
        />
      </div>
      <div className="flex flex-col gap-3">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          return (
            <Link
              href={item.route}
              key={item.label}
              className={`rounded-md p-3 hover:bg-primary-light ${isActive && "bg-primary-light"}`}
            >
              <item.icon isActive={isActive} />
            </Link>
          );
        })}
      </div>

      <button
        className="absolute bottom-6"
        onClick={handleShowUserProfileOverlay}
      >
        <Avatar
          name={user?.displayName || "User"}
          avatarUrl="/assets/images/avatarImg.png"
          isOnline={isOnline}
        />
      </button>
      {showUserProfileOverlay && (
        <div className="absolute bottom-20 left-5 z-10">
          <UserProfileOverlay onClose={handleShowUserProfileOverlay} />
        </div>
      )}
    </div>
  );
};

export default LeftSidebar;
