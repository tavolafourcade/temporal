"use client";
import { useEffect, useRef } from "react";
import { BotIcon } from "lucide-react";
import Image from "next/image";

import { ChatMessage } from "@/types";
import Avatar from "@/components/shared/Avatar";

interface ChatWindowProps {
  data: ChatMessage[];
}

const ChatWindow = ({ data }: ChatWindowProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [data]);

  return (
    <div className="flex flex-col flex-grow p-6 overflow-auto">
      {data.map((item: ChatMessage, index: number) => (
        <div
          key={index}
          className={`mt-6 ${item.userName === "me" ? "self-end text-right" : "text-left max-w-[396px] flex"}`}
        >
          {item.userName !== "me" && (
            <div className="mr-3">
              <Avatar name={item.userName} actionBar />
            </div>
          )}
          <div>
            <div className="flex justify-between leading-[19.2px] pb-2">
              {item.aiGenerated ? (
                <div className="flex gap-2 items-center">
                  <BotIcon />
                  <p className="text-grey-subtext leading-6 font-light">
                    AI-generated
                  </p>
                </div>
              ) : (
                <p className="font-normal">
                  {item.userName === "me" ? "You" : item.userName}
                </p>
              )}
              <p className="text-sm text-grey-subtext leading-[21px] font-light">
                {item.hour}
              </p>
            </div>
            <p
              className={`p-4 rounded-2xl font-light leading-6 ${item.userName === "me" ? "bg-primary text-white" : "bg-white text-ttwilight-navy border border-border"}`}
            >
              {item.message}
            </p>
            {item.thumbsUp && (
              <div className="p-2 rounded-full border border-border w-fit mt-2 bg-white">
                <Image
                  src={"/assets/icons/thumbsUp.svg"}
                  width={24}
                  height={24}
                  alt="thumbs up icon"
                />
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ChatWindow;

// {
//   "data": {
//       "adset_name": "TikTok ",
//       "setter_message_count": 0,
//       "last_updated": {
//           "seconds": 1718375542,
//           "nanoseconds": 429000000
//       },
//       "ai_setter_msgs": 9,
//       "marked_favorite": false,
//       "all_messages_read": true,
//       "user_opted_out": false,
//       "marked_dq": false,
//       "disqualified": false,
//       "meeting_confirmed": false,
//       "lead_name": "Madeline",
//       "sent_by": [
//           "AI",
//           "Lead",
//           "AI",
//           "AI",
//           "Lead",
//           "AI",
//           "AI",
//           "Lead",
//           "AI",
//           "AI",
//           "Lead",
//           "AI",
//           "AI",
//           "Lead"
//       ],
//       "creation_time": {
//           "seconds": 1718374273,
//           "nanoseconds": 467000000
//       },
//       "scheduled_msg_status": false,
//       "marked_completed": false,
//       "ai_number": "+18663492827",
//       "messages": [
//           {
//               "content": "Hey, is this Madeline?",
//               "role": "assistant"
//           },
//           {
//               "role": "user",
//               "content": "Yes"
//           },
//           {
//               "role": "assistant",
//               "content": "This is Mark from Avocademy"
//           },
//           {
//               "content": "Are you looking to transition to a high paying career in design?",
//               "role": "assistant"
//           },
//           {
//               "content": "Yes!",
//               "role": "user"
//           },
//           {
//               "role": "assistant",
//               "content": "Great"
//           },
//           {
//               "role": "assistant",
//               "content": "To see if we can help can you tell me a bit about yourself? What do you currently do for work?"
//           },
//           {
//               "role": "user",
//               "content": "Marketing and sales "
//           },
//           {
//               "role": "assistant",
//               "content": "Nice"
//           },
//           {
//               "role": "assistant",
//               "content": "What excites you about becoming a designer?"
//           },
//           {
//               "role": "user",
//               "content": "Just making a vision come to life, working from home as well is a big plus "
//           },
//           {
//               "content": "Love it. Our students on average make $88k+ a year after landing a work and majority are fully remote",
//               "role": "assistant"
//           },
//           {
//               "content": "Are you willing to dedicate at least 10 hours a week to the program?",
//               "role": "assistant"
//           },
//           {
//               "content": "Oh ya!",
//               "role": "user"
//           }
//       ],
//       "first_msg_reply": true,
//       "closer_phone": "",
//       "statuses": {
//           "SM1f53d3c67f0662bfb3e07e6505cd4691": {
//               "position": 2,
//               "time": {
//                   "seconds": 1718374356,
//                   "nanoseconds": 745000000
//               },
//               "status": "DELIVERED"
//           },
//           "SMf1f29acd5bef868a44645cff3f38dab6": {
//               "time": {
//                   "seconds": 1718374277,
//                   "nanoseconds": 174000000
//               },
//               "position": 0,
//               "status": "DELIVERED"
//           },
//           "SM0537f2d625b87509581c2a4d39e8ef3b": {
//               "time": {
//                   "seconds": 1718374464,
//                   "nanoseconds": 196000000
//               },
//               "position": 5,
//               "status": "DELIVERED"
//           },
//           "SM381f52006d88c53dce00caa9c09a53bd": {
//               "position": 6,
//               "time": {
//                   "seconds": 1718374475,
//                   "nanoseconds": 604000000
//               },
//               "status": "DELIVERED"
//           },
//           "SMce02150b70e25d4c960a83b0a2c0c5f5": {
//               "status": "DELIVERED",
//               "time": {
//                   "seconds": 1718374709,
//                   "nanoseconds": 955000000
//               },
//               "position": 9
//           },
//           "SMde21d4075aecde03b8e1bc65ca541120": {
//               "status": "DELIVERED",
//               "time": {
//                   "seconds": 1718374368,
//                   "nanoseconds": 120000000
//               },
//               "position": 3
//           },
//           "SMf0545b061f0bebb0908951171b19ac1d": {
//               "position": 11,
//               "time": {
//                   "seconds": 1718375504,
//                   "nanoseconds": 406000000
//               },
//               "status": "DELIVERED"
//           },
//           "SMe2049a9fda3989f2177cf811d851d08a": {
//               "position": 8,
//               "time": {
//                   "seconds": 1718374698,
//                   "nanoseconds": 302000000
//               },
//               "status": "DELIVERED"
//           },
//           "SM4703ef6d6a9d8f8ab021223684f23115": {
//               "time": {
//                   "seconds": 1718375520,
//                   "nanoseconds": 146000000
//               },
//               "status": "DELIVERED",
//               "position": 12
//           }
//       },
//       "iMessage": false,
//       "final_nudge": false,
//       "email": "Maddiesipos123@gmail.com",
//       "app_info": "",
//       "ai_setter": true,
//       "new_ai_saving": true,
//       "budget": "",
//       "timestamps": [
//           {
//               "seconds": 1718374273,
//               "nanoseconds": 467000000
//           },
//           {
//               "seconds": 1718374283,
//               "nanoseconds": 16000000
//           },
//           {
//               "seconds": 1718374347,
//               "nanoseconds": 606000000
//           },
//           {
//               "seconds": 1718374357,
//               "nanoseconds": 606000000
//           },
//           {
//               "seconds": 1718374390,
//               "nanoseconds": 637000000
//           },
//           {
//               "seconds": 1718374453,
//               "nanoseconds": 838000000
//           },
//           {
//               "seconds": 1718374463,
//               "nanoseconds": 838000000
//           },
//           {
//               "seconds": 1718374647,
//               "nanoseconds": 922000000
//           },
//           {
//               "seconds": 1718374691,
//               "nanoseconds": 474000000
//           },
//           {
//               "seconds": 1718374701,
//               "nanoseconds": 474000000
//           },
//           {
//               "seconds": 1718375456,
//               "nanoseconds": 362000000
//           },
//           {
//               "seconds": 1718375498,
//               "nanoseconds": 342000000
//           },
//           {
//               "seconds": 1718375508,
//               "nanoseconds": 342000000
//           },
//           {
//               "seconds": 1718375542,
//               "nanoseconds": 430000000
//           }
//       ],
//       "msg_credit_count": 6,
//       "zapier_alerted": false
//   }
// }
