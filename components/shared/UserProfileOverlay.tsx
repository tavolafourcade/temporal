import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";

interface UserProfileOverlayProps {
  onClose: () => void;
}

const UserProfileOverlay = ({ onClose }: UserProfileOverlayProps) => {
  const { isOnline, changeIsOnline, logOut } = useAuth();

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="max-w-xs mx-auto bg-white rounded-lg shadow-lg p-2 text-gray-700"
      ref={overlayRef}
    >
      <div className="flex items-center mb-4 p-2">
        <Image
          src="/assets/images/avatarImg.png"
          alt="Profile picture"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-900">Max Gonzalez</h2>
          <p className="text-gray-500">gonzalez@mail.com</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4 p-2">
        <span className="text-gray-900">{isOnline ? "Online" : "Offline"}</span>
        <Switch
          checked={isOnline}
          onCheckedChange={changeIsOnline}
          className={`${isOnline ? "bg-blue-500" : "bg-gray-200"} relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span
            className={`${isOnline ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
      </div>
      <div className=" border-t border-grey-neutral mx-2"></div>
      <div className="mt-3">
        <div className="hover:bg-grey-hover mt-3 p-2 hover:rounded-lg mb-1">
          <Link
            href="/profile"
            className="flex items-centertext-ttwilight-navy gap-2"
          >
            <Image
              src="/assets/icons/user.svg"
              alt="User icon"
              width={24}
              height={24}
            />
            Profile
          </Link>
        </div>
        <div
          className="hover:bg-grey-hover p-2 hover:rounded-lg cursor-pointer flex items-center text-ttwilight-navy gap-2"
          onClick={logOut}
        >
          <Image
            src="/assets/icons/logout.svg"
            alt="Logout icon"
            width={24}
            height={24}
          />
          Sign out
        </div>
      </div>
    </div>
  );
};

export default UserProfileOverlay;
