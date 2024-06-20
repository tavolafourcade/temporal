import React, { PropsWithChildren } from "react";

import ConversationsFolders from "@/components/shared/ConversationsFolders";

type ConversationsLayoutProps = PropsWithChildren<object>;

const ConversationsLayout = ({ children }: ConversationsLayoutProps) => {
  return (
    <>
      <div className="w-[368px]">
        <ConversationsFolders />
      </div>
      {children}
    </>
  );
};

export default ConversationsLayout;
