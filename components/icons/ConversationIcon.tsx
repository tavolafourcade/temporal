"use client";
import { LeftSidebarIconProps } from "@/types";

const ConversationIcon = ({ isActive }: LeftSidebarIconProps) => {
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
          d="M14 9C14 9.53043 13.7893 10.0391 13.4142 10.4142C13.0391 10.7893 12.5304 11 12 11H6L2 15V4C2 2.9 2.9 2 4 2H12C12.5304 2 13.0391 2.21071 13.4142 2.58579C13.7893 2.96086 14 3.46957 14 4V9Z"
          stroke={isActive ? "var(--primary)" : "#9C9DAD"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V22L18 18H12C11.4696 18 10.9609 17.7893 10.5858 17.4142C10.2107 17.0391 10 16.5304 10 16V15"
          stroke={isActive ? "var(--primary)" : "#9C9DAD"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default ConversationIcon;
