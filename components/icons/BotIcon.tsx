import { LeftSidebarIconProps } from "@/types";
import React from "react";

const BotIcon = ({ isActive }: LeftSidebarIconProps) => {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 8V4H8"
          stroke={isActive ? "primary" : "grey-subtext"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 8H6C4.89543 8 4 8.89543 4 10V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V10C20 8.89543 19.1046 8 18 8Z"
          stroke={isActive ? "var(--primary)" : "#9C9DAD"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 14H4"
          stroke={isActive ? "var(--primary)" : "#9C9DAD"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 14H22"
          stroke={isActive ? "var(--primary)" : "#9C9DAD"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 13V15"
          stroke={isActive ? "var(--primary)" : "#9C9DAD"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 13V15"
          stroke={isActive ? "var(--primary)" : "#9C9DAD"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default BotIcon;
