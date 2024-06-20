"use client";

import { useState } from "react";
import { Copy, PanelRightIcon } from "lucide-react";

import Avatar from "@/components/shared/Avatar";
import { contactBarLinks } from "@/constants";
import { useLeadContext } from "@/context/LeadContext";
import CustomPopover from "@/components/shared/CustomPopover";

const ContactActionBar = () => {
  const { leadProfileOpen, handleLeadProfileOpen } = useLeadContext();

  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const temporalPhoneNumber = "+1 555-234-5678";

  const handleCopyPhoneNumber = () => {
    navigator.clipboard.writeText(temporalPhoneNumber);
  };

  return (
    <div className="flex justify-between p-6 text-ttwilight-navy border-b border-border">
      <div className="flex items-center gap-3">
        <Avatar name="Benjamin Smith" actionBar />
        <div className="flex flex-col gap-2 font-medium">
          <p>Benjamin Smith</p>
          <div className="flex gap-2">
            <p className="text-sm text-grey-subtext font-light">
              {temporalPhoneNumber}
            </p>
            <div onClick={handleCopyPhoneNumber}>
              <CustomPopover message="Copied to the clipboard" Icon={Copy} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        {contactBarLinks.map((item) => {
          const isActive = activeIcon === item.label;
          const IconComponent = item.icon;

          return (
            <div
              key={item.label}
              className={`p-3 border rounded-md border-grey-neutral hover:cursor-pointer hover:bg-primary-light max-h-12 max-w-12 hover:text-primary ${isActive ? "bg-primary-light" : ""}`}
              onClick={() => setActiveIcon(item.label)}
            >
              <IconComponent
                className={
                  isActive
                    ? "text-primary"
                    : "text-ttwilight-navy hover:text-primary"
                }
              />
            </div>
          );
        })}
        {!leadProfileOpen ? (
          <div
            className="p-3 border rounded-md hover:cursor-pointer hover:text-primary max-h-12 max-w-12 hover:bg-primary-light"
            onClick={handleLeadProfileOpen}
          >
            <PanelRightIcon />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ContactActionBar;
