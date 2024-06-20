import React from "react";

import NoMessagesAvailable from "@/components/NoMessagesAvailable";
import ChatWindow from "./ChatWindow";
import { ChatMessage } from "@/types";

const data: ChatMessage[] = [
  {
    userName: "me",
    userImage: "me.jpg",
    hour: "10:15 AM",
    message: "By the way, did you finish the report for the Q2 review?",
    read: true,
    aiGenerated: true,
    thumbsUp: false,
  },
  {
    userName: "Benjamin Smith",
    userImage: "Benjamin Smith.jpg",
    hour: "10:17 AM",
    message:
      "Yes, I finished it yesterday. I'll send it to you right after this.",
    read: true,
    aiGenerated: false,
    thumbsUp: false,
  },
  {
    userName: "me",
    userImage: "me.jpg",
    hour: "10:20 AM",
    message:
      "Thanks, Emma. I'll review it and get back to you if I have any questions.",
    read: true,
    aiGenerated: false,
    thumbsUp: false,
  },
  {
    userName: "Benjamin Smith",
    userImage: "Benjamin Smith.jpg",
    hour: "10:22 AM",
    message:
      "That works for me. I'll prepare the necessary documents for the discussion.",
    read: true,
    aiGenerated: false,
    thumbsUp: false,
  },
  {
    userName: "me",
    userImage: "me.jpg",
    hour: "10:25 AM",
    message:
      "Great, I'll send out the meeting invite shortly. Is there anything else we need to cover?",
    read: true,
    aiGenerated: true,
    thumbsUp: false,
  },
  {
    userName: "Benjamin Smith",
    userImage: "Benjamin Smith.jpg",
    hour: "10:27 AM",
    message:
      "I don't think so. Just make sure to review the latest client feedback before the meeting.",
    read: true,
    aiGenerated: false,
    thumbsUp: false,
  },
  {
    userName: "me",
    userImage: "me.jpg",
    hour: "10:30 AM",
    message:
      "Will do. I've already noted down the key points. See you tomorrow.",
    read: true,
    aiGenerated: true,
    thumbsUp: false,
  },
  {
    userName: "Benjamin Smith",
    userImage: "Benjamin Smith.jpg",
    hour: "10:32 AM",
    message: "Perfect. Have a good day, Emma!",
    read: true,
    aiGenerated: false,
    thumbsUp: false,
  },
  {
    userName: "me",
    userImage: "me.jpg",
    hour: "8:40 PM",
    message:
      "Hi Benjamin, this is Emma from XYZ Technologies. I noticed your interest in our new product line on our website. How can I assist you further?",
    read: true,
    aiGenerated: false,
    thumbsUp: false,
  },
  {
    userName: "Benjamin Smith",
    userImage: "Benjamin Smith.jpg",
    hour: "8:43 PM",
    message: "Hi Emma, could you provide more details on their features? 🙌",
    read: true,
    aiGenerated: false,
    thumbsUp: true,
  },
  {
    userName: "me",
    userImage: "me.jpg",
    hour: "8:48 PM",
    message:
      "Absolutely, Benjamin! Our smart home devices include features such as voice control, remote access, and integration with other smart systems.",
    read: true,
    aiGenerated: true,
    thumbsUp: true,
  },
];

const ConversationSection = () => {
  return (
    <div
      className={`flex-grow flex bg-whispering-white overflow-auto ${!data.length ? "items-center justify-center" : ""}`}
    >
      {!data.length ? (
        <NoMessagesAvailable subtitle="You haven't sent any messages yet." />
      ) : (
        <ChatWindow data={data} />
      )}
    </div>
  );
};

export default ConversationSection;
