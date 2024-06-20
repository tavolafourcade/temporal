import React from "react";
import { Clock4 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { inputIcons } from "@/constants";

const ChatInputField = () => {
  return (
    <div className="border border-border rounded-lg bg-white m-6 active:border-primary">
      <Textarea
        placeholder="Type a message"
        className="placeholder:text-grey-subtext p-4 resize-none border-none"
      />
      <div className="flex justify-between items-center mb-4 mx-4">
        <div className="flex gap-4">
          {inputIcons.map((item) => (
            <div
              key={item.label}
              className="hover:cursor-pointer text-grey-subtext hover:text-primary"
            >
              <item.icon />
            </div>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          <div className="hover:cursor-pointer text-grey-subtext hover:text-primary">
            <Clock4 />
          </div>
          <Button>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInputField;
