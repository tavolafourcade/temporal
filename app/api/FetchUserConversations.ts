"use client";
import { db } from "@/lib/firebase";
import {
  doc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  startAfter,
} from "firebase/firestore";
import { Conversation } from "@/types";

let lastVisible: unknown = null;

const FetchUserConversations = (
  userId: string,
  startTime?: Timestamp,
  endTime?: Timestamp,
  // pageSize: number = 50,
): Promise<{ convos: Conversation[]; unsubscribe: () => void }> => {
  return new Promise((resolve, reject) => {
    const convosData: Conversation[] = [];

    try {
      const userDocRef = doc(db, "users", userId);
      const convosCollectionRef = collection(userDocRef, "convos");

      let convosQuery;
      if (startTime && endTime) {
        convosQuery = query(
          convosCollectionRef,
          where("last_updated", ">=", startTime),
          where("last_updated", "<=", endTime),
          orderBy("last_updated", "desc"),
          // limit(pageSize),
        );
      } else {
        convosQuery = query(
          convosCollectionRef,
          orderBy("last_updated", "desc"),
          // limit(pageSize),
        );
      }

      if (lastVisible) {
        convosQuery = query(convosQuery, startAfter(lastVisible));
      }

      const unsubscribe = onSnapshot(convosQuery, (querySnapshot) => {
        convosData.length = 0;

        querySnapshot.forEach((convoDoc) => {
          const convoData = convoDoc.data() as Omit<Conversation, "id">;
          convosData.push({
            id: convoDoc.id,
            ...convoData,
          });
        });

        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        resolve({ convos: convosData, unsubscribe });
      });
    } catch (error) {
      console.error("Error fetching convos and messages:", error);
      reject(error);
    }
  });
};

export default FetchUserConversations;
