"use client";
import { LeftSidebarIconProps } from "@/types";

const ChartIcon = ({ isActive }: LeftSidebarIconProps) => {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke={isActive ? "var(--primary)" : "#9C9DAD"}
      >
        <path
          d="M21.2104 15.8881C20.5742 17.3926 19.5792 18.7183 18.3123 19.7494C17.0454 20.7805 15.5452 21.4856 13.9428 21.8029C12.3405 22.1203 10.6848 22.0403 9.12055 21.5699C7.55627 21.0996 6.13103 20.2532 4.96942 19.1048C3.80782 17.9564 2.94522 16.5409 2.45704 14.9821C1.96886 13.4233 1.86996 11.7686 2.169 10.1628C2.46804 8.55691 3.1559 7.04875 4.17245 5.77015C5.189 4.49156 6.50329 3.48144 8.0004 2.82812"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V12H22Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default ChartIcon;
