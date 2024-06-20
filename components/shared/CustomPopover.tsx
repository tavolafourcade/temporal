"use client";

import React, { useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CustomPopoverProps {
  Icon: React.ElementType;
  message: string;
}

const CustomPopover: React.FC<CustomPopoverProps> = ({ Icon, message }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTrigger = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div onClick={handleTrigger} className="inline-flex">
            <Icon
              className="hover:cursor-pointer hover:text-primary"
              width={16}
              height={16}
            />
          </div>
        </PopoverTrigger>
        {isOpen && (
          <PopoverContent>
            <p>{message}</p>
          </PopoverContent>
        )}
      </Popover>
    </>
  );
};

export default CustomPopover;
