/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Filter, Conversation } from "@/types";
import { ConversationsFilters, LastUpdateRange } from "@/constants";
import NoMessagesAvailable from "@/components/NoMessagesAvailable";
import LocalSearch from "@/components/shared/LocalSearch";
import {
  defaultLastUpdateRanges,
  getTimestamp,
  sortConversations,
} from "@/lib/utils";
import Avatar from "./Avatar";
import {
  CollectionReference,
  DocumentSnapshot,
  QueryConstraint,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import FetchUserConversations from "@/app/api/FetchUserConversations";

// type LastUpdatedValues = "24-hours" | "72-hours" | "2-weeks";

const ConversationsFolders = () => {
  const { user } = useAuth();

  const [selectedFilter, setSelectedFilter] = useState({});
  const [openSearchField, setOpenSearchField] = useState(false);
  const [userClaims, setUserClaims] = useState<any>({});
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentRange, setCurrentRange] = useState<LastUpdateRange>(
    LastUpdateRange.HOURS_24,
  );
  const isFetching = useRef(false);

  // const conversationsMap = useRef(new Map());
  // const prevConversationsRef = useRef<Conversation[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const userId = "8xlbtyU5sNK93CwzRfib";
  //     const range = defaultLastUpdateRanges[currentRange];
  //     const convos = await FetchUserConversations(
  //       userId,
  //       range.start,
  //       range.end,
  //     );
  //     setConversations((prevConversations) => [
  //       ...prevConversations,
  //       ...convos,
  //     ]);
  //   };
  //   fetchData();
  // }, [currentRange]);

  useEffect(() => {
    let unsubscribeFn: (() => void) | null = null;

    const fetchData = async () => {
      const userId = "8xlbtyU5sNK93CwzRfib";
      const range = defaultLastUpdateRanges[currentRange as LastUpdateRange];

      try {
        const { unsubscribe, convos } = await FetchUserConversations(
          userId,
          range.start,
          range.end,
        );

        if (conversations.length === 0) {
          setConversations(convos);
        }
        unsubscribeFn = unsubscribe;
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchData();
    console.log("conversations.length ----->", conversations.length);
    return () => {
      if (unsubscribeFn) {
        unsubscribeFn();
      }
    };
  }, [conversations.length, currentRange]);

  // useEffect(() => {
  //   // const unsubscribeFn: (() => void) | null = null;

  //   const fetchData = async () => {
  //     const userId = "8xlbtyU5sNK93CwzRfib";
  //     const range = defaultLastUpdateRanges[currentRange as LastUpdateRange];

  //     try {
  //       const convos = await FetchUserConversations(
  //         userId,
  //         range.start,
  //         range.end,
  //       );
  //       if (conversations.length === 0) {
  //         setConversations(convos);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching conversations:", error);
  //     }
  //   };
  //   fetchData();
  //   console.log("conversations.length ----->", conversations.length);
  // }, [conversations.length, currentRange]);

  const handleConversationsByFilter = (filter: Filter) => () => {
    setSelectedFilter(filter);
  };

  const handleOpenSearch = () => {
    setOpenSearchField(!openSearchField);
  };

  console.log("conversations -------->", conversations);

  const handleScroll = async (e: any) => {
    if (isFetching.current) return;

    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      isFetching.current = true;
      // const userId = user?.uid || "8xlbtyU5sNK93CwzRfib";
      const userId = "8xlbtyU5sNK93CwzRfib";

      let newConvos: Conversation[] = [];
      if (currentRange === LastUpdateRange.HOURS_24) {
        const { convos } = await FetchUserConversations(
          userId,
          defaultLastUpdateRanges[LastUpdateRange.HOURS_24_TO_72].start,
          defaultLastUpdateRanges[LastUpdateRange.HOURS_24_TO_72].end,
        );
        newConvos = convos;
        console.log("---------24_HOURS-------");
        setCurrentRange(LastUpdateRange.HOURS_24_TO_72);
      } else if (currentRange === LastUpdateRange.HOURS_24_TO_72) {
        const { convos } = await FetchUserConversations(
          userId,
          defaultLastUpdateRanges[LastUpdateRange.UP_2_WEEKS].start,
          defaultLastUpdateRanges[LastUpdateRange.UP_2_WEEKS].end,
        );
        console.log("-----------24_TO_72_HOURS-----------");
        newConvos = convos;
        setCurrentRange(LastUpdateRange.UP_2_WEEKS);
      } else if (currentRange === LastUpdateRange.UP_2_WEEKS) {
        const { convos } = await FetchUserConversations(
          userId,
          defaultLastUpdateRanges[LastUpdateRange.ALL_TIME].start,
          defaultLastUpdateRanges[LastUpdateRange.ALL_TIME].end,
        );
        setCurrentRange(LastUpdateRange.ALL_TIME);
        newConvos = convos;
      }

      setConversations((prevConvos) => {
        return newConvos.length > 0
          ? [...prevConvos, ...newConvos]
          : prevConvos;
      });
      isFetching.current = false;
    }
  };

  return (
    <section className="flex h-screen w-[368px] flex-col border-r">
      <div
        className={`flex justify-between p-6 pb-4 ${openSearchField ? "hidden" : ""}`}
      >
        <span className="text-title font-medium text-ttwilight-navy">
          Conversations
        </span>
        <div className="flex gap-6">
          <Image
            src="/assets/icons/search.svg"
            alt="Search conversation"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={handleOpenSearch}
          />
          <Image
            src="/assets/icons/add.svg"
            alt="Add conversation"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
      </div>

      {openSearchField && (
        <LocalSearch
          handleOpenSearch={handleOpenSearch}
          route="/conversations"
          placeholder="Search (⌘ K)"
        />
      )}
      <div className="flex w-full gap-4 border-b px-6 pb-6">
        {ConversationsFilters.map((filter) => (
          <span
            className={`cursor-pointer ${
              selectedFilter === filter ? "text-primary" : "text-disabled"
            } hover:text-primary`}
            key={filter.value}
            onClick={handleConversationsByFilter(filter)}
          >
            {filter.name}
          </span>
        ))}
      </div>
      <div
        className="flex size-full justify-center overflow-scroll"
        onScroll={handleScroll}
      >
        {!conversations.length ? (
          <div className="flex w-full h-full px-6 py-[72px]">
            <div className="border-dashed-custom flex justify-center">
              <NoMessagesAvailable
                image="/assets/images/manShrugging.svg"
                imageWidth={24}
                imageHeight={24}
                title="No conversations yet"
                subtitle="No messages here yet."
                type="avatar"
                btnIcon="/assets/icons/btnAdd.svg"
                btnIconWidth={16}
                btnIconHeight={16}
                btnContent="Add"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col">
            {conversations.map((conversation: Conversation) => (
              <div
                key={conversation.id}
                className={`py-4 pr-6 pl-12 gap-3 flex flex-col border-b hover:bg-primary-light hover:cursor-pointer ${!conversation.all_messages_read ? "border-l-2 border-l-primary bg-primary-light" : ""}`}
              >
                <div className="flex gap-[18px]">
                  <Avatar
                    name={user?.displayName || undefined}
                    source={user?.photoURL || undefined}
                  />
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between">
                      <div className="capitalize font-medium text-base leading-[19.5px] font-AeonikPro">
                        {conversation.lead_name}
                      </div>
                      <div className="flex gap-2 text-sm leading-[21px]">
                        {conversation.marked_starred && (
                          <Image
                            src="/assets/icons/pin.svg"
                            alt="Save for later"
                            width={16}
                            height={16}
                            className="cursor-pointer"
                          />
                        )}
                        {conversation.last_updated &&
                          getTimestamp(conversation.last_updated)}
                      </div>
                    </div>
                    <div className="font-normal text-sm leading-[21px] text-ttwilight-navy">
                      {user?.phoneNumber || undefined}
                    </div>
                  </div>
                </div>
                <div className="text-base font-normal">No messages yet...</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ConversationsFolders;
